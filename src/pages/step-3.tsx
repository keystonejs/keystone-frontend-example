/*
Finally, we do some mutations
*/
import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Divider, Error, ShowTasks } from "../components";
import { GetTasks, MutationParams } from "../types";

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

export default function Index() {
  const { loading, error, data } = useQuery<GetTasks>(GET_TASKS);
  const [updateDoneStatus] = useMutation<any, MutationParams>(UPDATE_TASK, {
    refetchQueries: ["getTasks"],
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <Error error={error} />;
  }

  return (
    <div>
      <ShowTasks
        heading="Still To Do 💻"
        tasks={data.incompleteTasks}
        onCheckboxChange={({ id }) =>
          updateDoneStatus({
            variables: {
              id,
              finishedBy: new Date().toISOString(),
              isComplete: true,
            },
          })
        }
      />
      <Divider />
      <ShowTasks
        heading="Done! 🏖"
        tasks={data.completeTasks}
        onCheckboxChange={({ id }) =>
          updateDoneStatus({
            variables: {
              id,
              finishedBy: null,
              isComplete: false,
            },
          })
        }
      />
    </div>
  );
}
