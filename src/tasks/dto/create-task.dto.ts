import { IsBoolean, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  cron: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  jsCode: string;
}
