import type { IImageUrls } from "./IImageUrls";

export interface IExerciseDetail {
  exerciseId: string;
  name: string;
  imageUrl: string;
  imageUrls: IImageUrls;
  equipments: string[];
  bodyParts: string[];
  exerciseType: string;
  targetMuscles: string[];
  secondaryMuscles: string[];
  videoUrl: string;
  keywords: string[];
  overview: string;
  instructions: string[];
  exerciseTips: string[];
  variations: string[];
  relatedExerciseIds: string[];
}
