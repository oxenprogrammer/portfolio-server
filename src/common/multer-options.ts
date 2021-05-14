import { HttpException, HttpStatus } from '@nestjs/common';

import { CloudinaryStorage } from 'multer-storage-cloudinary/lib';
import { v2 as cloudinary } from 'cloudinary';
import { diskStorage } from 'multer';
import { existsSync } from 'fs';
import { extname } from 'path';
import { mkdirSync } from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio',
  }
});

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  // limits: {
  // fileSize: process.env.MAX_FILE_SIZE,
  // },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  // Storage properties
  storage: storage,
};
