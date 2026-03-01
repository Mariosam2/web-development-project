export interface IExerciseQuery {
  name?: string;
  targetMuscles?: string;
  exerciseType?: string;
  bodyParts?: string;
  limit?: number;
  after?: string;
  before?: string;
}
