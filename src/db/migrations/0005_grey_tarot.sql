ALTER TABLE "refresh_tokens" ALTER COLUMN "token" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_chirpy_red" boolean DEFAULT false NOT NULL;