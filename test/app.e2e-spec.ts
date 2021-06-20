import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      //아무 데코레이터 도 없는 어떠한 propterty의 object를 거릅니다.
      whitelist: true,
      //누군가 이상한걸 보내면 리퀘스트 자체를 막는다.
      forbidNonWhitelisted: true,
      //리퀘스트올때 우리가 원하는 실제 타입으로 변환
      transform: true
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my movie api');
  });

  describe('/movies', () => {
    it('GET',()=>{
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([])
    });
    it('POST',()=>{
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title:"test",
          year:2121,
          genres:["test","test"]
        })
        .expect(201)
    })
    it('DELETE',()=>{
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404)
    })
  })

  describe('/movies/:id', () => {
    it('GET 200',()=>{
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
    });
    it('GET 404',()=>{
      return request(app.getHttpServer())
        .get('/movies/999')
    })
    it('PATCH 200',()=>{
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title:"Update Test"
        })
        .expect(200)
    });

    it('DELETE 200',()=>{
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
    });
  })
  
  

  
});
