import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentsDto {
  @ApiProperty({ description: "Comment id" })
  orderId: number;

  @ApiProperty({ description: "Comment title" })
  title: string;
}
