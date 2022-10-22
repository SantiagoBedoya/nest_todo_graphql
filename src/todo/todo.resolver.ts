import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dto';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'findAllTodos' })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: 'findOneTodo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  create(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  update(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'removeTodo' })
  remove(@Args('id') id: number) {
    return this.todoService.remove(id);
  }

  // agregations
  @Query(() => Int, { name: 'totalTodos' })
  total() {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, { name: 'completedTodos' })
  completed() {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, { name: 'pendingTodos' })
  pending() {
    return this.todoService.pendingTodos;
  }

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos,
    };
  }
}
