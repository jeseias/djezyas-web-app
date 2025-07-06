import z from "zod";

export const passwordSchema = z
	.string()
	.min(7, "Password must be at least 7 characters")
	.regex(/[A-Z]/, "Password must contain at least one capital letter")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[0-9]/, "Password must contain at least one number")
	.regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol");