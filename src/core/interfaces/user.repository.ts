import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';
export interface UserRepository {
    findByEmail(email: string): Promise<UserEntity | null>;
    create(user: CreateUserDto): Promise<UserEntity>;
}