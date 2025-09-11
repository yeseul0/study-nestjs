import {
  Controller,
  Get,
  Post as HttpPost,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';

@Controller('posts') // 기본 URL 경로: /posts
export class PostController {
  constructor(private readonly postService: PostService) {}

  // 1. 모든 게시글 조회
  @Get()
  async findAll(): Promise<Post[]> {
    return await this.postService.findAll();
  }

  // 2. 특정 게시글 조회 (ID로)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Post> {
    return await this.postService.findOne(id);
  }

  // 3. 게시글 생성
  @HttpPost()
  async create(
    @Body() postData: Partial<Post>, // 요청 본문에서 게시글 데이터 받음
    @Body('userId') userId: number, // 작성자의 ID를 본문에서 받음
  ): Promise<Post> {
    const user = new User(); // User 엔티티 생성
    user.id = userId; // 작성자 ID 설정
    return await this.postService.create(postData, user);
  }

  // 4. 게시글 수정
  @Put(':id')
  async update(
    @Param('id') id: number, // URL 파라미터에서 ID 받음
    @Body() updateData: Partial<Post>, // 요청 본문에서 수정할 데이터 받음
  ): Promise<Post> {
    return await this.postService.update(id, updateData);
  }

  // 5. 게시글 삭제
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.postService.delete(id);
  }
}
