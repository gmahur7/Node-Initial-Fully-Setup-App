import { Router } from "express";

import { healthRouter } from "@routes/health.route";
import { userRouter } from "@routes/user.route";

const router = Router();

router.use("/health", healthRouter);
router.use("/users", userRouter);

export { router };
