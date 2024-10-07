import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath = path.join(__dirname, 'images');

export const app = express();

app.use("/post/image", express.static(imagePath));

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(router);
app.use(errorHandler);
