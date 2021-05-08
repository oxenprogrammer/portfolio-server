import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer-options';
import { ProductCreateDTO } from './models/product-create.dto';

@Controller()
export class UploadController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  uploadFile(@UploadedFile() file, @Body() body: ProductCreateDTO) {
    console.log(file.path, body.title);
  }
}
