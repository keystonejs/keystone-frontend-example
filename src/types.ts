export type Task = {
  id: string;
  priority: "low" | "medium" | "high";
  isComplete: boolean;
  finishBy: string;
  label: string;
};

export type GetTasks = { incompleteTasks: Task[]; completeTasks: Task[] };

export type MutationParams = {
  id: string;
  finishedBy: string | null;
  isComplete: boolean;
};
