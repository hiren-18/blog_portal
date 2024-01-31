const express = require("express");
const app = express();
const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
const blog = require("./routes/index");
app.use("/api/v1", blog);

module.exports = app;
