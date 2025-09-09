import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { UserModule } from './user/user.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME, // 사용자 이름
      password: process.env.DB_PASSWORD, // 비밀번호
      database: process.env.DB_NAME, // 데이터베이스 이름
      entities: [User, Post], // 엔티티 파일 경로
      synchronize: true, // 개발 환경에서만 사용, 실제 운영 환경에서는 false로 설정
      logging: true, // 쿼리 로깅 활성화
    }),
    //TypeOrmModule.forFeature([User]), // entityManager 대신 Repository 클래스 사용.  특정 엔티티를 모듈에 등록 (리포지토리 사용 가능).. 아직 잘 모르겠음. 왜 하는지
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
