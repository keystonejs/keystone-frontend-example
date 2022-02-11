/*
Now we display both lists
*/
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Divider, Error, ShowTasks } from "../components";
import { GetTasks } from "../types";

const GET_TASKS = gql`
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

export default function Index() {
  const { loading, error, data } = useQuery<GetTasks>(GET_TASKS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <Error error={error} />;
  }

  return (
    <div>
      <ShowTasks heading="Still To Do 💻" tasks={data.incompleteTasks} />
      <Divider />
      <ShowTasks heading="Done! 🏖" tasks={data.completeTasks} />
    </div>
  );
}
