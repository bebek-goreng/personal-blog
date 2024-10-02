import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.js";


export const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(router);
app.use(errorHandler);
