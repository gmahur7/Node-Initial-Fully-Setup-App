import pinoHttp from "pino-http";

import { logger } from "@config/logger";

export const requestLogger = pinoHttp({
  logger,
  customSuccessMessage: (_req, res) => `request completed with status ${res.statusCode}`,
  customErrorMessage: (_req, res, error) =>
    `request errored with status ${res.statusCode}: ${error.message}`,
});
