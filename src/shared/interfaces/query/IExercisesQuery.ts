export interface IExerciseQuery {
  name: string | null;
  targetMuscles: string | null;
  exerciseType: string | null;
  bodyParts: string | null;
  limit: number;
  after: string | null;
  before: string | null;
}
