import type { IExercise } from "../exercise/IExercise";

export interface IWorkoutPayload {
  id?: string;
  imageId?: string;
  imageUrl?: string;
  title: string;
  estimatedDuration?: number;
  exercises?: IExercise[];
}
