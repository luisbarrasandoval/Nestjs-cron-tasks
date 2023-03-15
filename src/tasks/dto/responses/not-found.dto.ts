import { ApiProperty } from "@nestjs/swagger";

export class NotFoundResponse {
  @ApiProperty({ example: 404 })
  statusCode: number;
  @ApiProperty({ example: "Not Found" })
  message: string;
}