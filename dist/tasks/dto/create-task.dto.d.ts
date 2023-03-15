export declare class CronOrDate {
    msgError: string;
    validate(value: any, args: any): boolean;
    validateCronFromat(cron: string): boolean;
    defaultMessage(args: any): string;
}
export declare class CreateTaskDto {
    name: string;
    cron?: string;
    active: boolean;
    jsCode: string;
    datetime?: Date;
}
