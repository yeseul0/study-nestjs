import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMusic(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('파일이 없습니다');
    }

    if (!file.mimetype.includes('audio')) {
      throw new BadRequestException('오디오 파일만 가능');
    }

    const result = await this.musicService.uploadToPinata(file);

    return {
      cid: result.cid,
    };
  }

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('파일이 없습니다');
    }

    if (!file.mimetype.includes('image')) {
      throw new BadRequestException('이미지 파일만 가능');
    }

    const result = await this.musicService.uploadImageToPinata(file);

    return {
      cid: result.cid,
    };
  }

  @Get(':cid')
  async getMusic(@Param('cid') cid: string) {
    const file = await this.musicService.getFileFromPinata(cid);
    return file;
  }
}
