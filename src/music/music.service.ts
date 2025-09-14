import { Injectable } from '@nestjs/common';
import { PinataSDK } from 'pinata';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MusicService {
  private pinata: PinataSDK;

  constructor(private configService: ConfigService) {
    const pinataJwt = this.configService.getOrThrow<string>('PINATA_JWT');
    const pinataGateway = this.configService.getOrThrow<string>('GATEWAY_URL');

    this.pinata = new PinataSDK({
      pinataJwt,
      pinataGateway,
    });
  }

  async uploadToPinata(file: Express.Multer.File) {
    try {
      // File 타입 생성 - 타입 에러 무시
      const fileObj = new File([file.buffer as any], file.originalname, {
        type: file.mimetype,
      });
지
      // Pinata에 업로드 - public.file() 메서드 사용
      const result = await this.pinata.upload.public.file(fileObj);
      return result;
    } catch (error: any) {
      throw new Error(`Pinata 업로드 실패: ${error.message}`);
    }
  }

  async uploadImageToPinata(file: Express.Multer.File) {
    try {
      // File 타입 생성
      const fileObj = new File([file.buffer as any], file.originalname, {
        type: file.mimetype,
      });

      // Pinata에 이미지 업로드
      const result = await this.pinata.upload.public.file(fileObj);
      return result;
    } catch (error: any) {
      throw new Error(`이미지 업로드 실패: ${error.message}`);
    }
  }

  async getFileFromPinata(cid: string) {
    try {
      const file = await this.pinata.gateways.public.get(cid);
      return file.data;
    } catch (error) {
      throw new Error(`Pinata에서 파일 가져오기 실패: ${error.message}`);
    }
  }
}