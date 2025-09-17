const router = require("express").Router();
router.get("/", (req, res) => res.json({ message: "Official API root — integrate with INCOIS systems here" }));
module.exports = router;
