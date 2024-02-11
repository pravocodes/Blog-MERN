import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoute.js";
import blogRoute from "./Routes/blogRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());

dotenv.config();
//Connection with DB
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/blogs", blogRoute);
app.use("/", (req, res) => {
  res.send("<h1>Blog website</h1>");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running onmode on port ${PORT}`.bgGreen.white);
});
