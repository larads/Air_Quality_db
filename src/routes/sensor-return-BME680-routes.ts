import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { sensorBME680 } from "../drizzle/schema/sensorBME680";
import { db } from "../drizzle/client";

export const sensorReturnBME680Routes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/sensorBME680",
    {
      schema: {
        response: {
          200: z.union([
            z.array(z.object({
              id: z.string(),
              temperature: z.string(),
              humidity: z.string(),
              pressure: z.string(),
              airQuality: z.string(),
              created_at: z.date(),
            })),
            z.object({
              message: z.string(),
            }),
          ]),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (_, reply) => {
		try {
			const sensorData = await db.select().from(sensorBME680);
			
			if (sensorData.length === 0) {
				return reply.status(200).send({ message: "Sem dados" });
			}
			
			return reply.status(200).send(sensorData);
		} catch (error) {
			return reply.status(500).send({ message: "Erro ao buscar dados do sensor" });
		}
    },
  );
};
