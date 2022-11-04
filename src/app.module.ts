import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoSchema } from './todo.models';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin123:admin123@cluster0.0ckhmce.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'todos', schema: TodoSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
