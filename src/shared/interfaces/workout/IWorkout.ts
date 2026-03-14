import type { IExercise } from "../exercise/IExercise";

export interface IWorkout {
  id?: string;
  imageId?: string;
  imageUrl?: string;
  title: string;
  description: string | null;
  exerciseCount: string;
  completed: boolean;
  estimatedDuration?: number;
  exercises?: IExercise[];
}
