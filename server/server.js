import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// import routes
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Registering routes
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
