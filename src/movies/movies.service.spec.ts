import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', ()=>{
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array)
    })
  })

  describe('getOne',()=>{
    it('should return movie',()=>{
      service.create({
        title:'Test',
        genres: ['test1'],
        year: 2000
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined()
    })
    
    it('should throw 404 error', ()=>{
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('Delete One', () => {
    it('should return delete movie',()=>{
      service.create({
        title:'Test',
        genres: ['test1'],
        year: 2000
      });
      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(allMovies.length );
    })
    it('should throw 404 error', ()=>{
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })
  
  describe('create', () => {
    
    it('should create a movie', ()=>{
      const beforeCreate = service.getAll().length
      service.create({
        title:'Test',
        genres: ['test1'],
        year: 2000
      });
      const afterCreate = service.getAll().length
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

  describe('update', () => {
    it('should update  a movie', ()=>{
      service.create({
        title:'Test',
        genres: ['test1'],
        year: 2000
      });
      service.update(1 , {title: 'Updated Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    })
    it('should throw 404 error', ()=>{
      try{
        service.update(999,{});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })
  
  
});
