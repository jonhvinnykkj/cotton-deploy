CREATE TABLE "bales" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"qr_code" text NOT NULL,
	"safra" text,
	"talhao" text,
	"numero" text,
	"status" text DEFAULT 'campo' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"latitude" text,
	"longitude" text,
	"campo_latitude" text,
	"campo_longitude" text,
	"campo_timestamp" timestamp,
	"campo_user_id" varchar,
	"patio_latitude" text,
	"patio_longitude" text,
	"patio_timestamp" timestamp,
	"patio_user_id" varchar,
	"beneficiado_latitude" text,
	"beneficiado_longitude" text,
	"beneficiado_timestamp" timestamp,
	"beneficiado_user_id" varchar,
	CONSTRAINT "bales_qr_code_unique" UNIQUE("qr_code")
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"role" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
