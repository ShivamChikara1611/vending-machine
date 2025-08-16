import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import adminRoute from "./routes/adminRoute.js";



// app config
const app = express();
const port = process.env.PORT || 5000;
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
    res.send("API WORKING");
});


// listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
