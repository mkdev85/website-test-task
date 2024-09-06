import express, { Router } from "express";
import V1Routes from "./v1";

const appRouter: Router = express.Router();

appRouter.use("/api", V1Routes);

export default appRouter;
