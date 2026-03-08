import type { UserLevel } from "@src/shared/enums/UserLevel.enum";

export interface IProfile {
  username: string;
  email: string;
  imageId: string | null;
  firstname: string | null;
  lastname: string | null;
  imageUrl: string | null;
  level: UserLevel;
}
