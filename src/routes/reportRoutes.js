const router = require("express").Router();
const multer = require("multer");
const { protect } = require("../middlewares/authMiddleware");
const { allowRoles } = require("../middlewares/roleMiddleware");
const { createReport, getReports, getHotspots } = require("../controllers/reportController");

// setup multer local storage (for development)
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, "uploads/"); },
  filename: function (req, file, cb) { cb(null, Date.now() + "-" + file.originalname); }
});
const upload = multer({ storage });

// create report (supports files)
router.post("/", protect, upload.array("media", 5), createReport);

// fetch reports (filters)
router.get("/", protect, getReports);

// hotspots (analysts & officials can use)
router.get("/hotspots", protect, allowRoles("analyst","official","admin"), getHotspots);

module.exports = router;
