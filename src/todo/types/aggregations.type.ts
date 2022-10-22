import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Todo quickk aggregations' })
export class AggregationsType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  completed: number;
}
