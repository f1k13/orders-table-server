import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// const start = async () => {
//   const PORT = process.env.PORT || 3000;
//   const app = await NestFactory.create(AppModule, { cors: true });
//   await app.listen(PORT);
//   const options = new DocumentBuilder()
//     .setTitle("orders")
//     .setDescription("orders")
//     .setVersion("1.0")
//     .addTag("orders")
//     .build();

//   const document = SwaggerModule.createDocument(app, options);
//   SwaggerModule.setup("api", app, document);
//   console.log(`Server start on port ${PORT}`);
// };
// start();
const start = async () => {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle("Orders example")
    .setDescription("The orders API description")
    .setVersion("1.0")
    .addTag("orders")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(PORT);
  console.log(`Server start on port ${PORT}`);
};
start();
