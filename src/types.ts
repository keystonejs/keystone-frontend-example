/*
Welcome to our types file! We wanted to focus the learnings on
how to use graphql with keystone, so we've hidden code that'll make
the rendered app feel better over here, letting you focus in the lesson
on the walkthrough's main topics.

We're starting to leverage keystone's generated types here, to make sure these
are accurate. In a future lesson, we'll look into using [ts-gql](https://github.com/Thinkmill/ts-gql)
for even better types on the frontend
*/
import { Lists, TaskUpdateInput } from ".keystone/types";

export type Task = Lists.Task.Item;

export type GetTasks = { incompleteTasks: Task[]; completeTasks: Task[] };

export type MutationParams = Pick<
  TaskUpdateInput,
  "finishedBy" | "isComplete"
> & { id: string };
