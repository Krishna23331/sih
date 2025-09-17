// Very lightweight analyzer — replace with more robust model/pipeline later.
// Uses keyword matching and natural library for tokenizing/sentiment stub.
const natural = require("natural");

const keyHazards = {
  tsunami: ["tsunami", "wave tsunami"],
  "high_wave": ["high wave","giant wave","huge wave","big wave"],
  "flooding": ["flood","inundation","water inside","flooding"],
  "coastal_damage": ["damage","broken","destroyed","eroded"],
  "abnormal_tide": ["abnormal tide","strange tide","sea receding"]
};

function detectHazard(text) {
  const lower = (text||"").toLowerCase();
  for (const [hazard, kws] of Object.entries(keyHazards)) {
    for (const kw of kws) if (lower.includes(kw)) return hazard;
  }
  return "other";
}

function extractTags(text) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text || "");
  // naive tags: top tokens longer than 3 chars
  return tokens.filter(t => t.length > 3).slice(0,6);
}

function sentimentStub(text) {
  // naive: presence of negative words -> negative
  const neg = ["danger", "help", "damage", "sinking", "disaster", "dead", "injured", "urgent"];
  const lower = (text||"").toLowerCase();
  for (const n of neg) if (lower.includes(n)) return "negative";
  if (lower.includes("safe") || lower.includes("ok") || lower.includes("thanks")) return "positive";
  return "neutral";
}

exports.analyzeText = (text, opts = {}) => {
  return {
    lang: opts.lang || "en",
    tags: extractTags(text),
    hazard: detectHazard(text),
    sentiment: sentimentStub(text)
  };
};
