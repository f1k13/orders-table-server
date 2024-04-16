import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersService } from "./users.service";
import { User } from "./users.model";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Get current user" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/self")
  getSelf(@Req() req: { user: User }) {
    return this.usersService.getUserById(req.user.id);
  }

  @ApiOperation({ summary: "Get all users" })
  @Get("/getAll")
  getAll() {
    return this.usersService.getAllUsers();
  }
}
