import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/product.routes.js";
import storeRoute from "./routes/store.routes.js";
import orderRoute from "./routes/order.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'https://render-zipzap-frontend-deployment.onrender.com',
    credentials: true,
  };

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/order", orderRoute);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
