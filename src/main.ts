import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.API_PORT;

  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('API to supply some data to my new front-end application build with Angular 9.')
    .setVersion('1.0')
    .addTag('Nest API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(`Running on port ${port}`)
  
  await app.listen(port);
}
bootstrap();
