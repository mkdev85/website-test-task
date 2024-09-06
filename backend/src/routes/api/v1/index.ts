import express, { Router } from "express";
import websitesRouter from "./websiteRoutes";

const router: Router = express.Router();
const NAMESPACE = "v1";

router.use(`/${NAMESPACE}/websites`, websitesRouter);

export default router;
