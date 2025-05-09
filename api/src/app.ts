import express, {Express} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connect from "./config/mongo.config";

import authRouter from "./routes/auth.router";
import appRouter from "./routes/app.router";
import bimRouter from "./routes/bim.router";
import oauthMiddle from "./middleware/oauth.middle";
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app : Express = express();
const port : number = parseInt(process.env.PORT || '3000');

connect()

const whiteList = [
    "https://www.syncroniza.cl",
    "http://localhost:3001",
    process.env.CORS_ORIGIN
];

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error(`Site: ${origin} not allowed by CORS`));
        }
    },
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Ruta de salud
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Routes
app.use('/auth', authRouter);
app.use('/api/bim', bimRouter); // Rutas BIM
app.use('/', oauthMiddle, appRouter);

app.listen(port, () => {
  return console.log(`Express is listening at port ${port}`);
});

export default app;
