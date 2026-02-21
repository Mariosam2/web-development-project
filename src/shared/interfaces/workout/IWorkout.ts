import type { IExercise } from "../exercise/IExercise";

export interface IWorkout {
  id?: string;
  title: string;
  estimatedDuration?: number;
  exercises: IExercise[];
}
