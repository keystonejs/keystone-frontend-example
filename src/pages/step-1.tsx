/*
TODO: Write this file where all it does is get a count of the tasks
*/

import { gql, useQuery } from "@apollo/client";
import { Error } from "../components";

const SIMPLE_QUERY = gql`
  query getItemCount {
    tasksCount
  }
`;

export default () => {
  const { data, loading, error } = useQuery(SIMPLE_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <Error error={error} />;
  }

  return <div>The current number of tasks is: {data.tasksCount}</div>;
};
