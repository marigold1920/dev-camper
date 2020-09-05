const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const connectionDB = require("./config/db");
const errorHandler = require("./middlewares/error");
const path = require("path");

// Load env vars
dotenv.config({ path: "./config/config.env" });
// Connect to MongoDB
connectionDB();

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const PORT = process.env.PORT || 5000;
const app = express();
// Body parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// File upload
app.use(fileupload());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1.0/bootcamps", bootcamps);
app.use("/api/v1.0/courses", courses);

// Error handler for middlewares
app.use(errorHandler);

const server = app.listen(PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (error, promise) => {
    console.log(`Error: ${error.message}`);
    // Close server & exit process
    server.close(() => process.exit());
});
