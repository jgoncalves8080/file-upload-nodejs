import express, { Request, Response } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();

routes.post(
  '/posts',
  multer(multerConfig).single('file'),
  (req: Request, res: Response) => {
    console.log(req.file);
    res.json({
      message: 'Yeah',
    });
  }
);

export default routes;
