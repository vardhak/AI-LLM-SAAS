CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"ismember" boolean,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
