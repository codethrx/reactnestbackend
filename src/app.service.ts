import { Injectable } from '@nestjs/common';
import { Todo, TodoDocument } from './todo.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('todos') private readonly todosModel: Model<TodoDocument>,
  ) {}

  async createTodo(todos: Todo): Promise<Todo> {
    const newTodo = new this.todosModel(todos);
    return newTodo.save();
  }

  async readTodo() {
    return this.todosModel
      .find({})
      .then((t) => {
        return t;
      })
      .catch((err) => console.log(err));
  }

  async updateTodo(id, data): Promise<Todo> {
    return this.todosModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTodo(id) {
    return this.todosModel.findByIdAndRemove(id);
  }
}
