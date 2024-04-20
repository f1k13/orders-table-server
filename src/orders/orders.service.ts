import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Orders } from "./orders.model";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders) private orderRepository: typeof Orders) {}
  async createOrder(dto: CreateOrderDto) {
    const orderNumber = await this.orderRepository.findOne({
      where: {
        numberOrder: dto.numberOrder,
      },
    });

    if (orderNumber) {
      throw new HttpException(
        "Заявки с таким номером уже существует",
        HttpStatus.BAD_REQUEST
      );
    }
    dto.statusOrder = "Новая";
    const order = await this.orderRepository.create(dto);
    return order;
  }
  async getOrders() {
    const orders = await this.orderRepository.findAll();
    return orders;
  }
  async deleteOrder(id: number) {
    await this.orderRepository.destroy({ where: { id } });
  }
}
