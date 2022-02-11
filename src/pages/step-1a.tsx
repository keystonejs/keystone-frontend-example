/*
In this step, we step forward with rendering some tasks
*/
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Error, ShowTasks } from "../components";
import { Task } from "../types";

const GET_TASKS = gql`
  query getTasks {
    tasks(where: { isComplete: { equals: false } }) {
      id
      priority
      isComplete
      finishBy
      label
    }
  }
`;

export default function Index() {
  const { loading, error, data } = useQuery<{ tasks: Task[] }>(GET_TASKS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <Error error={error} />;
  }

  return (
    <div>
      <ShowTasks heading="Still To Do 💻" tasks={data.tasks} />
    </div>
  );
}
