import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { sensorBME680 } from "../types/sensor";
import { sensorBME680 as sensorBME680Schema } from "../drizzle/schema/sensorBME680";
import { db } from "../drizzle/client";

export const sensorToBME680Routes: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/sensorBME680",
		{
			schema: {
				body: z.object({
					temperature: z.number(),
					humidity: z.number(),
					pressure: z.number(),
					airQuality: z.number(),
				}),
				response: {
					201: z.object({
						id: z.string(),
						temperature: z.string(),
						humidity: z.string(),
						pressure: z.string(),
						airQuality: z.string(),
						created_at: z.date(),
					}),
					400: z.object({
						message: z.string(),
						error: z.string().optional(),
					}),
					500: z.object({
						message: z.string(),
						error: z.string().optional(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const sensorData: sensorBME680 = request.body;
				if (!sensorData.temperature || !sensorData.humidity || !sensorData.pressure || !sensorData.airQuality) {
					return reply.status(400).send({
						message: "Dados do sensor incompletos",
						error: "Todos os campos são obrigatórios"
					});
				}
				const [newSensorData] = await db.insert(sensorBME680Schema).values({
					temperature: sensorData.temperature.toString(),
					humidity: sensorData.humidity.toString(),
					pressure: sensorData.pressure.toString(),
					airQuality: sensorData.airQuality.toString(),
				}).returning();

				return reply.status(201).send(newSensorData);

			} catch (error) {
				return reply.status(500).send({
					message: "Erro interno do servidor",
					error: error instanceof Error ? error.message : "Erro desconhecido"
				});
			}
		},
	);
};
