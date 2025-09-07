import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../entities/user.entity';

/* EntityManager VS Repository
    Repository 패턴을 사용하지 않고 EntityManager를 직접 사용..
    Repository는 클래스 내부 함수 호출할때 entity 객체 전달 안해줘도 됨.. 미세한 차이 ㅇㅇ
    아 EntityManager는 모든 엔티티에 대해 동작하는 반면, Repository는 특정 엔티티에 대해 동작함
    Repository를 주입할 때 애초에 엔티티 클래스를 지정해줘야 함!!! 난 천재야!!!
*/

@Injectable() //이 클래스가 NestJS 서비스임을 나타냄
export class UserService {
  // 생성자에서 EntityManager 주입
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    //@InjectRepository(User) private readonly userRepository: Repository<User>, // User 레포지토리 애초에 주입
  ) {}

  // 모든 사용자 조회
  async findAll(): Promise<User[]> {
    return this.entityManager.find(User); // User 엔티티의 모든 데이터 조회
    //return this.userRepository.find()
  }

  // 사용자 생성
  async create(userData: Partial<User>): Promise<User> {
    const user = this.entityManager.create(User, userData); // User 엔티티 생성
    return this.entityManager.save(User, user); // 데이터 저장
  }

  // 특정 사용자 조회
  async findOne(id: number): Promise<User> {
    return this.entityManager.findOne(User, { where: { id } }); // ID로 사용자 조회
  }

  // 사용자 삭제
  async delete(id: number): Promise<void> {
    await this.entityManager.delete(User, id); // ID로 사용자 삭제
  }
}
