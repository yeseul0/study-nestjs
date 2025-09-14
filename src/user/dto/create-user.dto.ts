import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsDefined,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined({ message: 'name 필드는 반드시 존재해야 합니다' })
  @IsNotEmpty({ message: '이름은 필수입니다' })
  @IsString({ message: '이름은 문자열이어야 합니다' })
  @MinLength(2, { message: '이름은 최소 2자 이상이어야 합니다' })
  @MaxLength(50, { message: '이름은 50자를 초과할 수 없습니다' })
  name: string;

  @IsDefined({ message: 'email 필드는 반드시 존재해야 합니다' })
  @IsNotEmpty({ message: '이메일은 필수입니다' })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다' })
  email: string;

  @IsOptional() // 선택적 필드
  @IsString({ message: '설명은 문자열이어야 합니다' })
  @MaxLength(200, { message: '설명은 200자를 초과할 수 없습니다' })
  description?: string;
}