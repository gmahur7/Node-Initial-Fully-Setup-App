import type { NextFunction, Request, Response } from "express";

import { HTTP_STATUS } from "@constants/http-status";
import { AppError } from "@utils/app-error";

export function notFoundMiddleware(req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, HTTP_STATUS.NOT_FOUND));
}
