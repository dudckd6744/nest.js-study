import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator"
import { CreateMovieDto } from "./create-movie.dto";

//유효성검사
export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @IsString()
    readonly title?: string;

    @IsNumber()
    readonly year?: number;
    
    @IsString({each:true})
    readonly genres ?: string[];
}