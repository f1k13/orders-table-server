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
      return comment;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }
  async getCommentsOfOrder(id: number) {
    try {
      if (!id) {
        throw new Error("Id is not defined");
      }
      const commentsOfOrder = await Orders.findAll({ where: { id } });
      return commentsOfOrder;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }
}
