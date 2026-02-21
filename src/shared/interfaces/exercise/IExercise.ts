export interface IExercise {
  exerciseId?: string;
  title: string;
  description?: string;
  name: string;
  bodyPart?: string;
  targetMuscle?: string;
  reps: number;
  sets: number;
  imageUrl?: string;
  videoUrl?: string;
}
