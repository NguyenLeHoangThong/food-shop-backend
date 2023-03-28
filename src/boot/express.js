import express from 'express';
import http from 'http';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import { router } from '../modules/index.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("../models/swagger.json") 

const app = express();

const server = http.createServer(app);

app.use(cors());

app.disable('x-powered-by');

app.enable('trust proxy');

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
    app.use('/swagger', swagger.serve, swagger.setup(swaggerDocument));
}

app.use(bodyParser.json());

app.use('/', router);

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        error: error.message
    })
})


export default server;