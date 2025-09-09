import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity'; // User 엔티티와 관계 정의를 위해 import

@Entity()
export class Post {
  @PrimaryGeneratedColumn() // 자동 증가하는 PK
  id: number;

  @Column() // 일반 컬럼 (게시글 제목)
  title: string;

  @Column('text') // 게시글 내용 (text 타입)
  content: string;

  // N:1 관계 (post:user=N:1) 설정
  @ManyToOne(() => User, (user) => user.posts) //User 엔티티의 posts 필드가 Post 엔티티임.
  user: User; // 작성자
}
