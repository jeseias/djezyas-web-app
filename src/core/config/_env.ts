import { z } from "zod";

export const envSchema = z.object({
	API_URL: z.string().url()
});

const _envSchema = envSchema.safeParse(process.env);

if (_envSchema.success === false) {
	console.error("Invalid environment variables", _envSchema.error.format());
	throw new Error("Invalid environment variables");
}

export const _env = _envSchema.data;
