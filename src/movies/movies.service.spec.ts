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

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a moive', () => {
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('not found id : 999 ');
      }
    });
  });

  describe('deleteOne()', () => {
    it('delete moive', () => {
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2000,
      });

      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toBeLessThan(allMovies.length);
    });
    it('return 404', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('create movie', () => {
      const beforeCreate = service.getAll().length;

      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('update movie', () => {
      service.create({
        title: 'Test',
        year: 2000,
        genres: ['test'],
      });
      service.update(1, { title: 'gasdjf' });

      const movie = service.getOne(1);

      expect(movie.title).toEqual('gasdjf');
    });
    it('return 404', () => {
      try {
        service.update(1, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
