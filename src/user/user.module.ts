import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

import { UserProfileController } from './controllers/user-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile, User } from 'src/common/typeorm';
import { Services } from 'src/common/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    
    UserModule,],
  controllers: [UserController, UserProfileController],
  providers: [{
    provide: Services.USERS,
    useClass: UserService,
  },
],
  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ]
})
export class UserModule {}
