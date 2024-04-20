import { Controller, Get, Post, Body, Delete, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./orders.service";
import { GetOrderDto } from "./dto/get-order.dto";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(private OrdersService: OrdersService) {}

  @ApiOperation({ summary: "Create order" })
  @ApiBody({ type: CreateOrderDto })
  @Post("/create")
  createOrder(@Body() orderDto: CreateOrderDto) {
    return this.OrdersService.createOrder(orderDto);
  }

  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({
    status: 200,
    description: "List of orders",
    type: [GetOrderDto],
  })
  @Get("/getOrders")
  getOrder() {
    return this.OrdersService.getOrders();
  }
  @ApiOperation({ summary: "Delete order" })
  @Delete("/delete")
  deleteOrder(@Query() query: { id: number }) {
    return this.OrdersService.deleteOrder(query.id);
  }
}
