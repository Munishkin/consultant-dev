import express from 'express';
import * as dotenv from 'dotenv';
import { initDb } from './db';
import routes from './routes';

dotenv.config();

initDb();
const app = express();
const port = process.env.PORT || 3000;

app.use(routes);
app.listen(port);
