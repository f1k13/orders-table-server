import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Comments } from "./comments.model";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
  imports: [SequelizeModule.forFeature([Comments])],
})
export class CommentsModule {}
