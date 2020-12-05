import { IsNumber, IsOptional, IsString } from 'class-validator';
import { StringifyOptions } from 'querystring';

export class CreateMovieDTO {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
