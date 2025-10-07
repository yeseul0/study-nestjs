// 주석주석 
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// @ApiTags('users') // Swagger에서 그룹핑
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
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id') // User 수정
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id') // User 삭제
  async delete(@Param('id') id: number): Promise<void> {
    return await this.userService.delete(id);
  }
}
