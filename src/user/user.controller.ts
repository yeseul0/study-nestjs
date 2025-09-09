import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Controller('users') // 'users' 경로에 대한 요청 처리
export class UserController {
  constructor(private readonly userService: UserService) {} // UserService 주입 

  @Get() // 모든 User 조회
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id') // 특정 User 조회
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post() // User 생성
  async create(@Body() userData: Partial<User>): Promise<User> {
    return await this.userService.create(userData);
  }

  @Delete(':id') // User 삭제
  async delete(@Param('id') id: number): Promise<void> {
    return await this.userService.delete(id);
  }
}
