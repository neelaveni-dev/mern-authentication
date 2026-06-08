const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
console.log(process.env.MONGO_URI);
app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname, "../uploads")));
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use((req,res,next)=>{
    console.log(req.method,req.url);
    next();
});
app.use("/api/auth", authRoutes);

app.get("/test",(req,res)=>{
    res.send("Backend Working");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port $ {PORT}");
});