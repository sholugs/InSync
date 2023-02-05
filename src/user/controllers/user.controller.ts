import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Inject, Query,  } from '@nestjs/common';
import { Routes, Services } from 'src/common/constants';
import { CreateUserInput } from 'src/common/types';
import { UserExists } from '../exceptions/userExists';
import { IUserService } from '../interfaces/user';

@Controller(Routes.USERS)
export class UserController {
    constructor(
        @Inject(Services.USERS) private readonly userService: IUserService,
    ) {}

    @Post('register')
    async createUser(@Body() body: CreateUserInput) {
        return this.userService.createUser(body);
    }

    @Get()
    async getUser() {
        return this.userService.getUser();
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }
    

    @Get('search')
    searchUsers(@Query('q') q: string) {
        console.log('q', q);
        if(!q) {
            throw new HttpException('Query parameter is required', HttpStatus.BAD_REQUEST);
        }
        return this.userService.searchUsers(q);
    }

    @Get('check')
    async checkUsername(@Query('username') username: string) {
        if(!username) {
            throw new HttpException('Query parameter is required', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.findUser({username});
        if (user) throw new UserExists();
        return HttpStatus.OK;
    }

}
