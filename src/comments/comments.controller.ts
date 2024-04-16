import { Controller, Post, Body, Get, Req } from "@nestjs/common";
import { CreateCommentsDto } from "./dto/create-comments.dto";
import { CommentsService } from "./comments.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("comments")
@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: "Create a new comment" })
  @ApiBody({ type: CreateCommentsDto })
  @Post("/create")
  createComment(@Body() commentsDto: CreateCommentsDto) {
    return this.commentsService.createComment(commentsDto);
  }

  @ApiOperation({ summary: "Get comments of a specific order" })
  @ApiResponse({
    status: 200,
    description: "List of comments",
    type: [CreateCommentsDto],
  })
  @Get("/getOfOrder")
  getOfOrder(@Req() req: { id: number }) {
    return this.commentsService.getCommentsOfOrder(req.id);
  }
}
