import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//-----------------routes import------------------//
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import categoryRouter from './routes/category.route.js'


// http://localhost:8000/api/v1/users/register
//-----------------routes declaration-------------
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categorys", categoryRouter);


export default app;
