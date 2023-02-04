import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ImageStorageModule } from './image-storage/image-storage.module';
import entities from './common/typeorm';
import { UserService } from './user/services/user.service';
require('dotenv').config();

let envFilePath = '.env.development';
if (process.env.NODE_ENV === 'production') {
  envFilePath = '.env.production';
}

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ envFilePath }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities,
      synchronize: true,
      logging: false,
    }),
    ImageStorageModule,
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {}
