/*
Now we display both lists
*/
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Divider, Error, ShowTasks } from "../components";
import { GetTasks } from "../types";

const GET_TASKS = gql`
  query getTasks {
    tasks(where: { isComplete: { equals: true } }, orderBy: { priority: asc }) {
      id
      priority
      isComplete
      finishedBy
      label
    }
    tasks(
      where: { isComplete: { equals: false } }
      orderBy: { priority: asc }
    ) {
      id
      priority
      isComplete
      finishedBy
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
