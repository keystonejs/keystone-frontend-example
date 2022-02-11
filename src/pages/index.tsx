import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Divider, Error, TodoItem } from "../components";

const query = gql`
  query getTasks {
    incompleteTasks: tasks(where: { isComplete: { equals: false } }) {
      id
      priority
      isComplete
      finishBy
      label
    }
    completeTasks: tasks(
      orderBy: [{ finishBy: desc }]
      where: { isComplete: { equals: true } }
    ) {
      id
      priority
      isComplete
      finishBy
      label
    }
  }
`;

const mutation = gql`
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

type Task = {
  id: string;
  priority: "low" | "medium" | "high";
  isComplete: boolean;
  finishBy: string;
  label: string;
};

export default function Index() {
  const { loading, error, data, refetch } =
    useQuery<{ incompleteTasks: Task[]; completeTasks: Task[] }>(query);
  const [updateDoneStatus] = useMutation<
    any,
    { id: string; finishedBy: string | null; isComplete: boolean }
  >(mutation, { refetchQueries: ["getTasks"] });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <Error error={error} />;
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>To-Do 💻</h2>
      {data.incompleteTasks.map((todoItem) => (
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
      {data.completeTasks.map((todoItem) => (
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
