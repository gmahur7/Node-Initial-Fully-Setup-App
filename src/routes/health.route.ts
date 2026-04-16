import { Router } from "express";

import { HTTP_STATUS } from "@constants/http-status";

const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.status(HTTP_STATUS.OK).json({ status: "ok" });
});

export { healthRouter };
