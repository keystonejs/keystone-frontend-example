import React, { useMemo } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Divider, Error, TodoItem } from "./src/components";
import { GetTasks, MutationParams, Task } from "./src/types";

// This is an alternate fork of the behaviour where we are getting
// around a refetch of all the tasks, by making the frontend split
// the list - the apollo cache update on mutation is therefore
// sufficient. The one used in the main tutorial series is a bit more idiomatic
const GET_ALL_TASKS = gql`
  query getAllTasks {
    tasks {
      id
      priority
      isComplete
      finishBy
      label
    }
  }
`;

const UPDATE_TASK = gql`
  mutation updateATask($id: ID, $isComplete: Boolean, $finishedBy: DateTime) {
    updateTask(
      where: { id: $id }
      data: { isComplete: $isComplete, finishBy: $finishedBy }
    ) {
      isComplete
      id
      finishBy
    }
  }
`;

// Why are we doing this?
// Well, KS lets you sort by priority, but you can only specify ASC or DESC
// which is alphabetical.
const priorityFunction = (a: Task, b: Task): -1 | 1 => {
  const priorities = ["high", "medium", "low"];

  return priorities.indexOf(a.priority) > priorities.indexOf(b.priority)
    ? 1
    : -1;
};

export default function Index() {
  const { data, loading, error } =
    useQuery<{ tasks: GetTasks["completeTasks"] }>(GET_ALL_TASKS);
  const [updateDoneStatus] = useMutation<any, MutationParams>(UPDATE_TASK);

  const { completeTasks, incompleteTasks } = useMemo(() => {
    return {
      completeTasks:
        data?.tasks.filter((a) => a.isComplete).sort(priorityFunction) || [],
      incompleteTasks:
        data?.tasks.filter((a) => !a.isComplete).sort(priorityFunction) || [],
    };
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <Error error={error} />;
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Still To Do 💻</h2>
      {incompleteTasks.map((todoItem) => (
        <TodoItem
          {...todoItem}
          onCheckboxChange={() =>
            updateDoneStatus({
              variables: {
                id: todoItem.id,
                finishedBy: new Date().toISOString(),
                isComplete: true,
              },
            })
          }
        />
      ))}
      <Divider />
      <h2 style={{ textAlign: "center" }}>Done! 🏖</h2>
      {completeTasks.map((todoItem) => (
        <TodoItem
          {...todoItem}
          onCheckboxChange={() =>
            updateDoneStatus({
              variables: {
                id: todoItem.id,
                finishedBy: null,
                isComplete: false,
              },
            })
          }
        />
      ))}
    </div>
  );
}
