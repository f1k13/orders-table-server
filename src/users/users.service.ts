import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    //   if (!user) {
    //     throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    //   }
    return user;
  }
  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    // if (!user) {
    //   throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    // }
    return user;
  }
}
