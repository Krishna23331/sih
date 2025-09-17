const SocialPost = require("../models/socialPostModel");
const nlpService = require("../services/nlpService");

// endpoint to ingest social post (can be used by connectors or manual ingest)
exports.ingest = async (req, res, next) => {
  try {
    const { source = "other", externalId, text, lang, raw } = req.body;
    const nlp = nlpService.analyzeText(text || "", { lang });
    const post = await SocialPost.create({
      source, externalId, text, lang: nlp.lang || lang || "en",
      extractedTags: nlp.tags, predictedHazard: nlp.hazard, sentiment: nlp.sentiment,
      createdAtSource: req.body.createdAtSource, raw
    });
    res.status(201).json(post);
  } catch (err) { next(err); }
};

exports.getSocial = async (req, res, next) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const posts = await SocialPost.find().sort({ ingestedAt: -1 }).skip((page-1)*limit).limit(parseInt(limit));
    res.json({ count: posts.length, posts });
  } catch (err) { next(err); }
};
