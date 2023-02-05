import { User } from "src/common/typeorm";
import { CreateUserInput, FindUserParams, FindUserOptions } from "src/common/types";

export interface IUserService {
    getUser(): Promise<User[]>;
    deleteUser(id: number): Promise<unknown>;
    createUser(input: CreateUserInput): Promise<User>;
    findUser(findUserParams: FindUserParams, options?: FindUserOptions): Promise<User>;
    saveUser(user: User): Promise<User>;
    searchUsers(q: string): Promise<User[]>;
}