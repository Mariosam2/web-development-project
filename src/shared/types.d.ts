import * as z from "zod";
import type { RegisterSchema } from "./schema/RegisterSchema";

export type RegisterForm = z.infer<typeof RegisterSchema>;
export type ProfileSettingsForm = z.infer<typeof ProfileSettingsSchema>;
export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;
