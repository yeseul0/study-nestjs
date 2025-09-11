import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from '../entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]), // Repository 사용(EntityManager X) + app.module.ts에 TypeOrmModule.forRoot에 있어야함 (앱)
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService], //
})
export class PostModule {}
