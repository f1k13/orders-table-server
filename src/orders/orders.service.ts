import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Orders } from "./orders.model";
import { CreateOrderDto } from "./dto/create-order.dto";
import { GetOrderDto } from "./dto/get-order.dto";
import { Op } from "sequelize";

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
    const totalCount = await this.orderRepository.count();
    return { order, totalCount };
  }
  async searchOrders(title: string) {
    const orders = await this.orderRepository.findAll({
      where: {
        numberOrder: { [Op.like]: `%${title}%` },
      },
    });
    return orders;
  }

  async getOrders(page: number = 1, pageSize: number = 10) {
    const offset = (page - 1) * pageSize;

    const orders = await this.orderRepository.findAll({
      offset,
      limit: pageSize,
    });
    const totalCount = await this.orderRepository.count();

    return { orders, totalCount };
  }
  async deleteOrder(id: number) {
    await this.orderRepository.destroy({ where: { id } });
  }
  async getOrderById(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }
  async putOrder(dto: GetOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id: dto.id } });

    if (!order) {
      throw new HttpException("Заявка не найдена", HttpStatus.NOT_FOUND);
    }

    order.numberOrder = dto.numberOrder;
    order.date = dto.date;
    order.time = dto.time;
    order.nameOfClientsCompany = dto.nameOfClientsCompany;
    order.nameOfCarrier = dto.nameOfCarrier;
    order.phoneNumberOfCarrier = dto.phoneNumberOfCarrier;
    order.statusOrder = dto.statusOrder;
    order.ati = dto.ati;

    await order.save();
    await order.reload();
    return order;
  }
  async filtersOrder(dto: GetOrderDto) {
    const filters: any = {};

    if (dto.numberOrder !== undefined) filters.numberOrder = dto.numberOrder;
    if (dto.date !== undefined) filters.date = dto.date;
    if (dto.time !== undefined) filters.time = dto.time;
    if (dto.nameOfClientsCompany !== undefined)
      filters.nameOfClientsCompany = dto.nameOfClientsCompany;
    if (dto.nameOfCarrier !== undefined)
      filters.nameOfCarrier = dto.nameOfCarrier;
    if (dto.phoneNumberOfCarrier !== undefined)
      filters.phoneNumberOfCarrier = dto.phoneNumberOfCarrier;
    if (dto.statusOrder !== undefined) filters.statusOrder = dto.statusOrder;
    console.log(filters.statusOrder);
    const filteredOrders = await this.orderRepository.findAll({
      where: filters,
    });

    return filteredOrders;
  }
  async sortingOrder(sortBy: string, sortOrder: string) {
    const allowedSortFields = ["numberOrder", "date", "time"];
    const allowedSortOrders = ["ASC", "DESC"];

    if (
      !allowedSortFields.includes(sortBy) ||
      !allowedSortOrders.includes(sortOrder)
    ) {
      throw new HttpException(
        "Недопустимый способ сортировки",
        HttpStatus.BAD_REQUEST
      );
    }

    const sortedOrders = await this.orderRepository.findAll({
      order: [[sortBy, sortOrder]],
    });

    return sortedOrders;
  }
}
