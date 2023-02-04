import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { v4 as uuidv4} from 'uuid'
import { AuthenticatedRequest } from './types';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}

export function isAuthorized(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    if (!req.user) {
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
    next();
}

export const generateUUID = (): string => {
    return uuidv4();
}