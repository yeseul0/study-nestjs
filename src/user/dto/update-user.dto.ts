import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// CreateUserDto의 모든 필드를 선택적으로 만듦
export class UpdateUserDto extends PartialType(CreateUserDto) {}
