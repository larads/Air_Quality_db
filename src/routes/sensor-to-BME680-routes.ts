import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const sensorToBME680Routes: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/sensorBME680",
		{
			schema: {
				body: z.object({
					temperature: z.number(),
					humidity: z.number(),
					pressure: z.number(),
					gasResistance: z.number(),
				}),
				response: {
					201: z.object({
						temperature: z.number(),
						humidity: z.number(),
						pressure: z.number(),
						gasResistance: z.number(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { temperature, humidity, pressure, gasResistance } = request.body;
			return reply.status(201).send({
				temperature,
				humidity,
				pressure,
				gasResistance,
			});
		},
	);
};
