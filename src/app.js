const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");

// load env
dotenv.config();

// connect db
connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// static for uploaded media (in production use cloud storage)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/social", require("./routes/socialRoutes"));
app.use("/api/official", require("./routes/officialRoutes"));

// error middleware
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
