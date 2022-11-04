import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Todo } from './todo.models';
import { TodoUpdateData } from './todoUpdate';
import mongoose from 'mongoose';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createTodo(@Body() userDto: Todo, @Res() res) {
    if (!userDto.title)
      return res.status(400).json({ error: 'Error creating todo.' });
    try {
      const newUser = await this.appService.createTodo(userDto);
      return res.status(201).json({ newUser });
    } catch (e) {
      return res.status(400).json({ error: 'Error creating a todo.' });
    }
  }

  @Get()
  async readTodo() {
    return await this.appService.readTodo();
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateData: TodoUpdateData,
    @Res() res,
  ): Promise<Todo> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Error Updating Todo.' });
    }
    try {
      const updatedTodo = await this.appService.updateTodo(id, updateData);
      console.log(updatedTodo);
      return res.status(201).json({ updatedTodo });
    } catch (e) {
      return res.status(400).json({ error: 'Error updating Todo!!' });
    }
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string, @Res() res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Error Deleting Todo..' });
    }
    try {
      const deletedTodo = await this.appService.deleteTodo(id);
      return res.status(201).json({ deletedTodo });
    } catch (e) {
      return res.status(400).json({ error: 'Error Deleting Todo!!' });
    }
  }
}
