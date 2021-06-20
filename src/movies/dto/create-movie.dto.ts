import { IsNumber, IsString } from "class-validator"

// 유효성과 타입 검사
export class CreateMovieDto {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsString({each:true})
    readonly genres: string[];
}