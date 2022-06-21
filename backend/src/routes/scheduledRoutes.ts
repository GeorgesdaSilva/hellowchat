import { Router } from "express";
import * as ScheduledController from "../controllers/ScheduledController";
import isAuth from "../middleware/isAuth";


const scheduledRoutes = Router();

scheduledRoutes.get("/scheduleds", isAuth,ScheduledController.show);
scheduledRoutes.get("/scheduleds/:id", isAuth,ScheduledController.details);
scheduledRoutes.post("/scheduleds",isAuth, ScheduledController.store);
scheduledRoutes.put("/scheduleds/:id",isAuth, ScheduledController.update);
scheduledRoutes.delete("/scheduleds/:id",isAuth, ScheduledController.remove);

export default scheduledRoutes;