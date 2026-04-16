import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "@controllers/user.controller";
import { validateRequest } from "@middlewares/validate-request";
import {
  createUserSchema,
  updateUserSchema,
  userIdParamsSchema,
} from "@validators/user.validator";

const userRouter = Router();

userRouter.post("/", validateRequest({ body: createUserSchema }), createUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", validateRequest({ params: userIdParamsSchema }), getUserById);
userRouter.patch(
  "/:id",
  validateRequest({ params: userIdParamsSchema, body: updateUserSchema }),
  updateUser,
);
userRouter.delete("/:id", validateRequest({ params: userIdParamsSchema }), deleteUser);

export { userRouter };
