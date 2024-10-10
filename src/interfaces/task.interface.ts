export interface TaskInterface {
  id: string;
  title: string;
  status: TaskStatus;
}

export type TaskStatus = "open" | "in-progress" | "done";
