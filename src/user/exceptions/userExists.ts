import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExists extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.CONFLICT);
  }
}
