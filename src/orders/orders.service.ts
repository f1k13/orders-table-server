import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Orders } from "./orders.model";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders) private orderRepository: typeof Orders) {}
  async createOrder(dto: CreateOrderDto) {
    const order = await this.orderRepository.create(dto);
    return order;
  }
  async getOrders() {
    const orders = await this.orderRepository.findAll();
    return orders;
  }
}
