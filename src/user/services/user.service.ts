import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/common/helpers';
import { User } from 'src/common/typeorm';
import { CreateUserInput, FindUserOptions, FindUserParams } from 'src/common/types';
import { Repository } from 'typeorm';
import { IUserService } from '../interfaces/user';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async getUser(){
        return this.userRepository.find();
    }

    async deleteUser(id: number) {
        return this.userRepository.delete(id);
    }

    async createUser(input: CreateUserInput): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: {
                username: input.username,
            },
        });
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const password = await hashPassword(input.password);
        const newUser = this.userRepository.create({
            ...input,
            password,
        });
        return await this.userRepository.save(newUser);
    }

    async findUser(params: FindUserParams,
        options?: FindUserOptions,
    ): Promise<User> {
        const selections: (keyof User)[] = [
            'email',
            'username',
            'firstName',
            'lastName',
            'id',
        ];
        const selectionsWithPassword: (keyof User)[] = [...selections, 'password'];
        return this.userRepository.findOne({
            where: params, 
            select: options?.selectAll ? selectionsWithPassword : selections});
        }
    

    async saveUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async searchUsers(q: string): Promise<User[]> {
        const statement = '(user.username LIKE :q)';
        return this.userRepository
            .createQueryBuilder('user')
            .where(statement, { q: `%${q}%` })
            .limit(10)
            .select(['user.username', 'user.firstName', 'user.lastName', 'user.email', 'user.id', 'user.profile'])
            .getMany();
    }
}
