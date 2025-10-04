import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { sensorReturnBME680Routes } from "./routes/sensor-return-BME680-routes";
import { sensorToBME680Routes } from "./routes/sensor-to-BME680-routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.register(fastifyCors);

app.register(sensorToBME680Routes);
app.register(sensorReturnBME680Routes);

app.listen({ port: env.PORT }).then(() => {
	console.log("Server is running on port " + env.PORT);
});
