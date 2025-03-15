import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @Length(1, 255)
  title: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
