import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";


export const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));


