const router = require("express").Router();
const { ingest, getSocial } = require("../controllers/socialController");
const { protect } = require("../middlewares/authMiddleware");
const { allowRoles } = require("../middlewares/roleMiddleware");

// Ingest social posts (connectors will call this)
router.post("/ingest", ingest);

// get posts for analysts (protected)
router.get("/", protect, allowRoles("analyst","official","admin"), getSocial);

module.exports = router;
