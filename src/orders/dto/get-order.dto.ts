import { ApiProperty } from "@nestjs/swagger";
import { Comments } from "src/comments/comments.model";
import { CreateCommentsDto } from "src/comments/dto/create-comments.dto";

export class GetOrderDto {
  @ApiProperty({ description: "Order id" })
  id: number;
  @ApiProperty({ description: "Order number" })
  numberOrder: number;

  @ApiProperty({ description: "Date of the order" })
  date: string;

  @ApiProperty({ description: "Time of the order" })
  time: string;

  @ApiProperty({ description: "Name of client's company" })
  nameOfClientsCompany: string;

  @ApiProperty({ description: "Name of the carrier" })
  nameOfCarrier: string;

  @ApiProperty({ description: "Phone number of the carrier" })
  phoneNumberOfCarrier: string;
  @ApiProperty({ description: "Comments", type: [CreateCommentsDto] })
  comments: CreateCommentsDto[];
  @ApiProperty({ description: "Status of the order" })
  statusOrder: string;
}
