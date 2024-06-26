import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  getAllUsers() {
    throw new Error("Method not implemented.");
  }
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private readonly secretKey = process.env.PRIVATE_KEY || "ARCHLINUX";

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidateUsername = await this.usersService.getUserByUsername(
      dto.username
    );
    if (candidateUsername) {
      throw new HttpException("reg-username", HttpStatus.FORBIDDEN);
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user) {
    const payload = {
      username: user.username,
      id: user.id,
    };

    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getUserByUsername(dto.username);
    if (!user) {
      throw new HttpException("login", HttpStatus.FORBIDDEN);
    }
    const passwordEqual = await bcrypt.compare(dto.password, user.password);
    if (!passwordEqual) {
      throw new HttpException("login-password", HttpStatus.FORBIDDEN);
    }
    return user;
  }

  decodeToken(token: string): number {
    const decoded: { id: number } = this.jwtService.decode(token) as {
      id: number;
    };
    return decoded.id;
  }
}
