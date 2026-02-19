import { UserEntity, CreateUserDto } from '../entities/user.entity';
export interface UserRepository {
    findByEmail(email: string): Promise<UserEntity | null>;
    create(user: CreateUserDto): Promise<UserEntity>;
}