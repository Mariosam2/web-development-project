import type { IMetadata } from "../exerciseDb/IMetaData";
import type { IValidationError } from "./IValidationError";

export interface IApiResponse<T> {
  success: boolean;
  meta?: IMetadata;
  data: T;
  message?: string;
  validationErrors?: IValidationError[];
}
