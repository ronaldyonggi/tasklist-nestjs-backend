import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;
}
