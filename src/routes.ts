import express, { Request, Response } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import Post from './models/Post';

const routes = express.Router();

routes.post(
  '/posts',
  multer(multerConfig).single('file'),
  async (req: Request, res: Response) => {
    const post = await Post.create({
      name: req.file?.originalname,
      size: req.file?.size,
      key: req.file?.filename,
      url: '',
    });
    res.json(post);
  }
);

export default routes;
