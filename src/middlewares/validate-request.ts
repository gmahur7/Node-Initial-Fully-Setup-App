import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

import { HTTP_STATUS } from "@constants/http-status";

type RequestSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

function mapZodErrors(error: ZodError): string[] {
  return error.issues.map((issue) => `${issue.path.join(".") || "value"}: ${issue.message}`);
}

export function validateRequest(schemas: RequestSchemas) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as Request["params"];
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as Request["query"];
      }
      next();
    } catch (error) {
      const messages = mapZodErrors(error as ZodError);
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Validation failed",
        errors: messages,
      });
    }
  };
}
