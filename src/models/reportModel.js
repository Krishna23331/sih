const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // multilingual description support
  description: {
    text: { type: String },
    lang: { type: String, default: "en" }
  },
  media: [{ type: String }], // paths or URLs to uploaded media
  eventType: { type: String, enum: ["high_wave","tsunami","flooding","coastal_damage","swell_surge","abnormal_tide","other"], default: "other" },
  severity: { type: Number, min:1, max:5, default: 3 },
  verified: { type: Boolean, default: false },
  // GeoJSON point for geospatial queries
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" } // [lng, lat]
  },
  source: { type: String, enum: ["mobile","web","offline"], default: "mobile" },
  syncedAt: { type: Date }, // for offline sync
  meta: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
