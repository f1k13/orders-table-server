import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Comments } from "./comments.model";
import { Orders } from "src/orders/orders.model";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
  imports: [SequelizeModule.forFeature([Comments, Orders])],
})
export class CommentsModule {}
