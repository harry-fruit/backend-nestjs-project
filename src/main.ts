import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT;

  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('API fornecer dados para a minha aplicação treino construida em Angular.')
    .setVersion('1.0')
    .addTag('Nest API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(`Running on port ${port}`)
  
  await app.listen(3000);
}
bootstrap();
