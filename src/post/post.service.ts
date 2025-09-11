import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>, // Post 엔티티 Repository 주입
  ) {}

  // 1. 모든 게시글 조회
  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({ relations: ['user'] }); //Post와 관계를 맺고있는 user 정보 가져옴.(table join)
  }

  // 2. 특정 게시글 조회 (ID로)
  async findOne(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id }, //Post에 id필드있어서 자동으로 id=id됨
      relations: ['user'], // 작성자 정보 포함
    });
  }

  // 2-1. 특정 사용자가 작성한 모든 게시글 조회
  async findByUserId(userId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { user: { id: userId } }, // Post 엔티티의 user 필드(User)를 참조하며, 그 안에서 id(=user.id)가 userId인 데이터
      relations: ['user'], // 작성자 정보도 함께
      order: { id: 'DESC' }, // 최신 글부터
    });
  }

  // 3. 게시글 생성
  async create(postData: Partial<Post>, user: User): Promise<Post> {
    const newPost = this.postRepository.create({ ...postData, user }); // 작성자 정보 포함
    return await this.postRepository.save(newPost); // 저장 후 반환
  }

  // 4. 게시글 수정
  async update(id: number, updateData: Partial<Post>): Promise<Post> {
    const post = await this.findOne(id); // 기존 게시글 조회
    if (!post) throw new Error('Post not found'); // 게시글이 없으면 예외 처리

    Object.assign(post, updateData); // updateData 객체 겹치는 속성이 post 객체에 복사됨
    return await this.postRepository.save(post); // 저장 후 반환
  }

  // 5. 게시글 삭제
  async delete(id: number): Promise<void> {
    const post = await this.findOne(id); // 기존 게시글 조회
    if (!post) throw new Error('Post not found'); // 게시글이 없으면 예외 처리

    await this.postRepository.remove(post); // 삭제
  }
}
