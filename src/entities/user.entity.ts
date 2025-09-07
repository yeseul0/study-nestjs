import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity'; // PostEntity와 관계 정의를 위해 import

@Entity() // 이 클래스가 데이터베이스 테이블임을 나타냄
export class User {
  @PrimaryGeneratedColumn() // 자동 증가하는 PK
  id: number;

  @Column() // 일반 컬럼
  name: string;

  @Column({ unique: true }) // 이메일은 고유값으로 설정
  email: string;

  @OneToMany(() => Post, (post) => post.user) // 1:N 관계
  posts: Post[];
}
