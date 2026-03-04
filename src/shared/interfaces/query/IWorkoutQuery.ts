export interface IWorkoutQuery {
  limit: number;
  query: string;
  isCompleted: boolean | null;
  startDate: string | null;
  endDate: string | null;
}
