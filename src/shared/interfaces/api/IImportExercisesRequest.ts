import type { IExercise } from "../exercise/IExercise";

export interface IImportExercisesRequest {
  workoutId: string;
  exercises: IExercise[];
}
