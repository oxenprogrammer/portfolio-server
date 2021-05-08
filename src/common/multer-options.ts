import { HttpException, HttpStatus } from '@nestjs/common';

import { diskStorage } from 'multer';
import { existsSync } from 'fs';
import { extname } from 'path';
import { mkdirSync } from 'fs';

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
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = './uploads';
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
