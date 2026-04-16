import http from "node:http";

import { app } from "./app";
import { env } from "@config/env";
import { logger } from "@config/logger";
import { prisma } from "@config/prisma";

const server = http.createServer(app);

server.listen(env.PORT, () => {
  logger.info(`Server started on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

const shutdown = async (signal: string): Promise<void> => {
  logger.warn(`${signal} received. Shutting down gracefully...`);
  server.close(() => {
    try {
      void prisma
        .$disconnect()
        .then(() => {
          logger.info("Database disconnected");
          process.exit(0);
        })
        .catch((error: unknown) => {
          logger.error({ err: error }, "Error while disconnecting database");
          process.exit(1);
        });
    } catch (error) {
      logger.error({ err: error }, "Error while disconnecting database");
      process.exit(1);
    }
  });
};

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Unhandled rejection");
});

process.on("uncaughtException", (error) => {
  logger.fatal({ err: error }, "Uncaught exception");
  process.exit(1);
});
