import { User } from "src/common/typeorm";
import { UpdateUserProfileParams } from "../../common/types";

export interface IUserProfile {
    createProfile(user: User, params: UpdateUserProfileParams): Promise<User>;
    updateProfile(user: User, params: UpdateUserProfileParams): Promise<User>;
    createProfileOrUpdate(user: User, params: UpdateUserProfileParams): Promise<User>;
}