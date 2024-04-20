import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const start = async () => {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  app.enableCors();
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
