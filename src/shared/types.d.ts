import * as z from "zod";
import type { RegisterSchema } from "./schema/RegisterSchema";
import type { LoginSchema } from "./schema/LoginSchema";

export type LoginFormType = z.infer<typeof LoginSchema>;
export type RegisterForm = z.infer<typeof RegisterSchema>;
export type ProfileSettingsForm = z.infer<typeof ProfileSettingsSchema>;
export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;
export type ContactFormType = z.infer<typeof ContactSchema>;
