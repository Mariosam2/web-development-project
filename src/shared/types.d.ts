import * as z from "zod";
import type { RegisterSchema } from "./schema/RegisterSchema";

export type IconProps = {
  size?: number;
  className?: string;
};

export type RegisterForm = z.infer<typeof RegisterSchema>;
