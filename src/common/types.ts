import { User } from "./typeorm";

export type CreateUserInput = {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}


export type UserResponse = {
    user: User,
}

export type LoginInput = {
    username: string,
    password: string,
}

export type LoginResponse = {
    user: User,
    token: string,
}

export type FindUserParams = Partial<{
    id: number,
    email: string,
    username: string,
}>

export type FindUserOptions = Partial<{
    selectAll: boolean,
}>

export interface AuthenticatedRequest extends Request {
    user: User,
}

export type UserProfileFiles = Partial<{
    avatar: Express.Multer.File[];
    banner: Express.Multer.File[];
}>

export type UpdateUserProfileParams = Partial<{
    bio: string,
    banner: Express.Multer.File[],
    avatar: Express.Multer.File[],
}>

