require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

try {
    mongoose.connect(process.env.MONGO_URI);
}catch (error) {
    console.error("MongoDB connection error:", error);
}
    
app.use("/api", require("./routes/inquiry.routes"));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

module.exports = app;
