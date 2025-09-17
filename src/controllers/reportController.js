const Report = require("../models/reportModel");
const User = require("../models/userModel");
const Joi = require("joi");

// create report (supports offline sync with timestamps)
exports.createReport = async (req, res, next) => {
  try {
    // multer will attach files in req.files (optional)
    const schema = Joi.object({
      description: Joi.string().allow("").optional(),
      lang: Joi.string().optional(),
      eventType: Joi.string().optional(),
      severity: Joi.number().min(1).max(5).optional(),
      lat: Joi.number().required(),
      lng: Joi.number().required(),
      verified: Joi.boolean().optional(),
      source: Joi.string().valid("mobile","web","offline").default("mobile"),
      syncedAt: Joi.date().optional()
    });
    const body = await schema.validateAsync({ ...req.body });

    const media = (req.files || []).map(f => `/uploads/${f.filename}`);

    const report = await Report.create({
      reporter: req.user.id,
      description: { text: body.description || "", lang: body.lang || "en" },
      media,
      eventType: body.eventType || "other",
      severity: body.severity || 3,
      verified: body.verified || false,
      location: { type: "Point", coordinates: [ parseFloat(body.lng), parseFloat(body.lat) ] },
      source: body.source,
      syncedAt: body.syncedAt
    });

    res.status(201).json(report);
  } catch (err) { next(err); }
};

exports.getReports = async (req, res, next) => {
  try {
    const { eventType, verified, startDate, endDate, lng, lat, radiusKm = 50, page = 1, limit = 50 } = req.query;
    const query = {};
    if (eventType) query.eventType = eventType;
    if (verified) query.verified = verified === "true";
    if (startDate || endDate) query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);

    // geospatial filter
    if (lng && lat) {
      query.location = {
        $geoWithin: { $centerSphere: [ [ parseFloat(lng), parseFloat(lat) ], (radiusKm/6378.1) ] }
      };
    }

    const reports = await Report.find(query)
      .sort({ createdAt: -1 })
      .skip((page-1)*limit)
      .limit(parseInt(limit))
      .populate("reporter", "name email role");

    res.json({ count: reports.length, reports });
  } catch (err) { next(err); }
};

// generate hotspots: returns clusters/hotspots by grouping points in radius and counting
exports.getHotspots = async (req, res, next) => {
  try {
    // params: radiusKm, minCount
    const radiusKm = parseFloat(req.query.radiusKm) || 10;
    const minCount = parseInt(req.query.minCount) || 3;

    // simple aggregation: bucket points into geoNear + group by rounded lat/lng cell
    // Use $geoNear if you want to compute distances from a center. Here do a grid-aggregation:
    const cellSize = radiusKm / 111; // approx degrees per km (rough)
    
    const pipeline = [
      { $match: {} },
      { $project: {
        lng: { $arrayElemAt: ["$location.coordinates", 0] },
        lat: { $arrayElemAt: ["$location.coordinates", 1] },
        eventType: 1,
        createdAt: 1
      }},
      { $project: {
        cellX: { $floor: { $divide: ["$lng", cellSize] } },
        cellY: { $floor: { $divide: ["$lat", cellSize] } },
        eventType: 1,
        createdAt: 1
      }},
      { $group: {
        _id: { cellX: "$cellX", cellY: "$cellY", eventType: "$eventType" },
        count: { $sum: 1 },
        firstSeen: { $min: "$createdAt" },
        lastSeen: { $max: "$createdAt" }
      }},
      { $match: { count: { $gte: minCount } } },
      { $project: {
        eventType: "$_id.eventType",
        count: 1,
        firstSeen: 1,
        lastSeen: 1,
        _id: 0,
        // approximate center lat/lng
        center: { 
          $let: {
            vars: { cx: "$_id.cellX", cy: "$_id.cellY" },
            in: [ { $multiply: ["$$cx", cellSize] }, { $multiply: ["$$cy", cellSize] } ]
          }
        }
      }},
      { $limit: 200 }
    ];

    const hotspots = await Report.aggregate(pipeline);
    res.json({ hotspots });
  } catch (err) { next(err); }
};
