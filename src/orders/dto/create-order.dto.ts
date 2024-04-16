import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
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

  @ApiProperty({ description: "Status of the order" })
  statusOrder: string;
}
