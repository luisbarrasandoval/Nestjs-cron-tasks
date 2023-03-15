import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  Validate,
  ValidatorConstraint,
} from "class-validator";

// cron or datetime is optional
@ValidatorConstraint({ name: `cronOrDate`, async: false })
export class CronOrDate {
  msgError: string;

  validate(value: any, args: any) {
    const { cron, datetime } = args.object;

    if (cron && datetime) {
      this.msgError = `cron and datetime cannot be used together`;
      return false;
    }

    if (cron) {
      const result = this.validateCronFromat(cron);
      if (!result) {
        this.msgError = `cron is not valid`;
      }

      return result;
    }

    if (datetime) {
      const date = new Date(datetime);
      const result = date instanceof Date && !isNaN(date.getTime());
      if (!result) {
        this.msgError = `datetime is not valid`;
      }
    }

    return true;
  }

  validateCronFromat(cron: string) {
    const regexValidCron =
      /^((\*|\d+|\d+\-\d+|\d+\/\d+|\d+\-\d+\/\d+|\*\/\d+)\s){4}(\*|\d+|\d+\-\d+|\d+\/\d+|\d+\-\d+\/\d+|\*\/\d+)$/;
    const result = regexValidCron.test(cron);
    return result;
  }

  defaultMessage(args: any) {
    if (this.msgError) {
      return this.msgError;
    }
    return `cron or datetime is not valid`;
  }
}

export class CreateTaskDto {
  @IsString()
  @ApiProperty({
    description: `The name of the task`,
    example: `My First Task`,
  })
  name: string;

  @IsString()
  @IsOptional()
  @Validate(CronOrDate)
  @ApiProperty({
    description: `The cron format to execute the task`,
    example: `*/5  * * * *`,
  })
  cron?: string;

  @IsBoolean()
  @ApiProperty({
    description: `If the task is active or not`,
  })
  active: boolean;

  @IsString()
  @ApiProperty({
    description: `The code to execute`,
    example: `console.log('Hello World')`,
  })
  jsCode: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  datetime?: Date;
}
