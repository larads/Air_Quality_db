import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

let lastSensorData: {
  temperature: number;
  humidity: number;
  pressure: number;
  gasResistance: number;
} | null = null;

export const sensorReturnBME680Routes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/sensorBME680",
    {
      schema: {
        response: {
          200: z.union([
            z.object({
              temperature: z.number(),
              humidity: z.number(),
              pressure: z.number(),
              gasResistance: z.number(),
            }),
            z.object({
              message: z.string(),
            }),
          ]),
        },
      },
    },
    async (_, reply) => {
		if (!lastSensorData) {
			return reply.status(200).send({ message: "Sem dados" });
		}
		return reply.status(200).send(lastSensorData);		  
    },
  );
};
