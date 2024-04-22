import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from "@nestjs/common";
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
  getOrders(@Query() query: { page: number; pageSize: number }) {
    return this.OrdersService.getOrders(query.page, query.pageSize);
  }
  @ApiOperation({ summary: "Get order" })
  @ApiResponse({
    status: 200,
    description: "List of orders",
    type: [GetOrderDto],
  })
  @Get("/getOrder")
  getOrder(@Query() query: { id: number }) {
    return this.OrdersService.getOrderById(query.id);
  }
  @ApiOperation({ summary: "Delete order" })
  @Delete("/delete")
  deleteOrder(@Query() query: { id: number }) {
    return this.OrdersService.deleteOrder(query.id);
  }
  @ApiOperation({ summary: "Edit order" })
  @ApiResponse({
    status: 200,
    description: "Editible order",
    type: [GetOrderDto],
  })
  @Put("/edit")
  editOrder(@Body() orderDto: GetOrderDto) {
    return this.OrdersService.putOrder(orderDto);
  }
  @ApiOperation({ summary: "Filters order" })
  @ApiResponse({
    status: 200,
    description: "List of filtering orders",
    type: [GetOrderDto],
  })
  @Get("/filters")
  filtersOrder(@Query() query: GetOrderDto) {
    return this.OrdersService.filtersOrder(query);
  }
  @ApiOperation({ summary: "Sorting order" })
  @ApiResponse({
    status: 200,
    description: "List of sorting order",
  })
  @Get("/sorting")
  sortingOrder(@Query() query: { sortBy: string; sortOrder: string }) {
    return this.OrdersService.sortingOrder(query.sortBy, query.sortOrder);
  }
  @ApiOperation({ summary: "Search orders" })
  @ApiResponse({
    status: 200,
    description: "List of sorting order",
  })
  @Get("/search")
  searchOrder(@Query() query: { title: string }) {
    return this.OrdersService.searchOrders(query.title);
  }
}
