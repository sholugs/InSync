import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT } = process.env;
  try {
    await app.listen(PORT, () => console.log(`Server started on port ` + PORT));
  } catch {
    console.log('Error starting server');
  }
}
bootstrap();
