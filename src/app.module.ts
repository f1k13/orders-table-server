import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { OrdersModule } from "./orders/orders.module";
import { Orders } from "./orders/orders.model";
import { User } from "./users/users.model";
import { CommentsModule } from "./comments/comments.module";
import { Comments } from "./comments/comments.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Orders, Comments],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    OrdersModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
