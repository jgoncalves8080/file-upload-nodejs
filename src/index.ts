import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './routes';

const app = express();

mongoose.connect(process.env.MONGO_URL as string);

app.use(express.json());
app.use(morgan('dev'));
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
