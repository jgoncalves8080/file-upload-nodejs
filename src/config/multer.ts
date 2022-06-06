import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import crypto from 'crypto';
import mime from 'mime-types';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, '');

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'bd-file-upload',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, '');

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
};

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes['s3'],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const mimetype = mime.extension(file.mimetype);
    const allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    if (allowedTypes.includes(`${mimetype}`)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
};
