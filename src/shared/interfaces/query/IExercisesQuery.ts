export interface IExerciseQuery {
  name?: string;
  targetMuscles?: string;
  exerciseType?: string;
  bodyParts?: string;
  limit?: string;
  after?: string;
  before?: string;
}
