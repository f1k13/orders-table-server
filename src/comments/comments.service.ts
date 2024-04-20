import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comments } from "./comments.model";
import { CreateCommentsDto } from "./dto/create-comments.dto";
import { Orders } from "src/orders/orders.model";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments) private commentRepository: typeof Comments
  ) {}
  async createComment(dto: CreateCommentsDto) {
    try {
      const comment = await this.commentRepository.create(dto);
      const order = await Orders.findByPk(dto.orderId);
      console.log(order, "order");
      if (!Array.isArray(order.comments)) {
        order.comments = [];
      }
      order.comments.push(comment);
      await order.save();
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getCommentsOfOrder(id: number) {
    try {
      if (!id) {
        throw new Error("Id is not defined");
      }
      const commentsOfOrder = await this.commentRepository.findAll({
        where: { orderId: id },
      });
      return commentsOfOrder;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllComments() {
    const comments = await this.commentRepository.findAll();
    return comments;
  }
}
