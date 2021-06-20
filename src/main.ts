import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //클레스의 유효성검사
  app.useGlobalPipes(new ValidationPipe({
    //아무 데코레이터 도 없는 어떠한 propterty의 object를 거릅니다.
    whitelist: true,
    //누군가 이상한걸 보내면 리퀘스트 자체를 막는다.
    forbidNonWhitelisted: true,
    //리퀘스트올때 우리가 원하는 실제 타입으로 변환
    transform: true
  }));
  await app.listen(3000);
}
bootstrap();
