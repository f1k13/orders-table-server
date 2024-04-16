import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Orders } from "./orders.model";
import { Comments } from "src/comments/comments.model";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
  imports: [SequelizeModule.forFeature([Orders, Comments])],
})
export class OrdersModule {}
