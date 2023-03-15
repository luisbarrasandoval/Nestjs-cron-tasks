"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskDto = exports.CronOrDate = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let CronOrDate = class CronOrDate {
    validate(value, args) {
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
    validateCronFromat(cron) {
        const regexValidCron = /^((\*|\d+|\d+\-\d+|\d+\/\d+|\d+\-\d+\/\d+|\*\/\d+)\s){4}(\*|\d+|\d+\-\d+|\d+\/\d+|\d+\-\d+\/\d+|\*\/\d+)$/;
        const result = regexValidCron.test(cron);
        return result;
    }
    defaultMessage(args) {
        if (this.msgError) {
            return this.msgError;
        }
        return `cron or datetime is not valid`;
    }
};
CronOrDate = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: `cronOrDate`, async: false })
], CronOrDate);
exports.CronOrDate = CronOrDate;
class CreateTaskDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: `The name of the task`,
        example: `My First Task`,
    }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(CronOrDate),
    (0, swagger_1.ApiProperty)({
        description: `The cron format to execute the task`,
        example: `*/5  * * * *`,
    }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "cron", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        description: `If the task is active or not`,
    }),
    __metadata("design:type", Boolean)
], CreateTaskDto.prototype, "active", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: `The code to execute`,
        example: `console.log('Hello World')`,
    }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "jsCode", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreateTaskDto.prototype, "datetime", void 0);
exports.CreateTaskDto = CreateTaskDto;
//# sourceMappingURL=create-task.dto.js.map