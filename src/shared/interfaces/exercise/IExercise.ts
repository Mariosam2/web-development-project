import type { IExerciseOverview } from "../exerciseDb/IExerciseOverview";

export interface IExercise extends IExerciseOverview {
  id?: string;
  reps?: number;
  sets?: number;
}
