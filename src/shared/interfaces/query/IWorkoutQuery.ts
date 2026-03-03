export interface IWorkoutQuery {
  limit: number;
  query: string;
  isCompleted?: boolean;
  startDate: string;
  endDate: string;
}
