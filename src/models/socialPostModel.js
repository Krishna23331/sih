const mongoose = require("mongoose");

const socialPostSchema = new mongoose.Schema({
  source: { type: String, enum: ["twitter","facebook","youtube","other"], default: "other" },
  externalId: { type: String, index: true }, // id on the social platform
  text: { type: String },
  lang: { type: String, default: "en" },
  extractedTags: [{ type: String }],
  predictedHazard: { type: String },
  sentiment: { type: String, enum:["positive","neutral","negative"], default: "neutral" },
  createdAtSource: { type: Date },
  ingestedAt: { type: Date, default: Date.now },
  location: { // optional if we can geolocate
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number] }
  },
  raw: { type: mongoose.Schema.Types.Mixed } // raw payload if needed
});

module.exports = mongoose.model("SocialPost", socialPostSchema);
