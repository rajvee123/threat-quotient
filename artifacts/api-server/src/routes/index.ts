import { Router, type IRouter } from "express";
import healthRouter from "./health";
import threatQuotientRouter from "./threat-quotient";

const router: IRouter = Router();

router.use(healthRouter);
router.use(threatQuotientRouter);

export default router;
