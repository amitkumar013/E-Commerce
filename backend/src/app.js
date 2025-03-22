import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN.split(",");
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true
// }))


app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//-----------------routes import------------------//
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import categoryRouter from './routes/category.route.js'
import adminRouter from "./routes/adminProduct.route.js"
import orderRouter from "./routes/order.route.js";
import paymentRouter from "./routes/payment.route.js";
import healthCheckRouter from "./routes/healthCheck.route.js"


// http://localhost:8000/api/v1/users/register
//-----------------routes declaration-------------
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categorys", categoryRouter);
app.use("/api/v1/admin-products", adminRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/", healthCheckRouter);

export default app;
