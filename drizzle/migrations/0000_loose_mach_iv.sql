CREATE TABLE "sensor_bme680" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"temperature" numeric NOT NULL,
	"humidity" numeric NOT NULL,
	"pressure" numeric NOT NULL,
	"air_quality" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
