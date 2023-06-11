import  express from 'express';
import { initApp } from './src/app.routes.js';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express()
const port = process.env.PORT || 5000


initApp(app,express);


app.listen(port)