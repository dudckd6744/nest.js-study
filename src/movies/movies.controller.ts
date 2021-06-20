import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') Id: number): Movie {
        return this.moviesService.getOne(Id);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        console.log(movieData)
        return this.moviesService.create(movieData); 
    }

    @Delete('/:id')
    remove(@Param('id') Id: number) {
        return this.moviesService.deleteOne(Id);
    }

    @Patch('/:id')
    patch(@Param('id') Id: number , @Body() updateData: UpdateMovieDto) {
        return this.moviesService.update(Id, updateData);
    }

    
}
