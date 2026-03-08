import type { IExercise } from "../exercise/IExercise";

export interface IImportExercises {
  workoutId: string;
  exercises: IExercise[];
}
