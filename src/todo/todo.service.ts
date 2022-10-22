import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dto';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Piedra del Alma',
      done: false,
    },
    {
      id: 2,
      description: 'Piedra del Espacio',
      done: false,
    },
    {
      id: 3,
      description: 'Piedra del Poder',
      done: false,
    },
    {
      id: 4,
      description: 'Piedra del Tiempo',
      done: true,
    },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter((t) => t.done === true).length;
  }

  get pendingTodos() {
    return this.todos.filter((t) => t.done === false).length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    if (statusArgs.status !== undefined) {
      const todos = this.todos.filter((t) => t.done === statusArgs.status);
      return todos;
    }
    return this.todos;
  }
  findOne(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) throw new NotFoundException(`todo with id ${id} not found`);
    return todo;
  }
  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((t) => t.id), 0) + 1;

    this.todos.push(todo);
    return todo;
  }
  update(id: number, { description, done }: UpdateTodoInput) {
    const todo = this.findOne(id);
    if (description) todo.description = description;
    if (done !== undefined) todo.done = done;
    this.todos = this.todos.map((t) => {
      return t.id === id ? todo : t;
    });
    return todo;
  }
  remove(id: number) {
    const todo = this.findOne(id);
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    return true;
  }
}
