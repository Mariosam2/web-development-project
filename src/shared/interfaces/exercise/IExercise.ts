export interface IExercise {
  id?: string;
  exerciseId?: string;
  description?: string;
  name: string;
  bodyPart?: string;
  targetMuscle?: string;
  reps: number;
  sets: number;
  imageUrl?: string;
  videoUrl?: string;
}
