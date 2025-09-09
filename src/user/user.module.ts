import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Module({
  //라이브러리 모듈을 가져와서 현재 모듈에 통합
//   imports: [
//     TypeOrmModule.forFeature([User]), // User 엔티티를 TypeOrmModule에 등록
//   ],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}