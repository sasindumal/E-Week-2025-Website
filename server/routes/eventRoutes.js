import { Router } from "express";
const router = Router();
import { createEvent,getEvents,getLiveEvents,getFinishedEvents,getUpcomingEvents,ChangeToLive } from "../controllers/eventController.js";

router.post("/createEvents", createEvent);
router.get("/getEvents", getEvents);
router.get("/UpcomingEvents", getUpcomingEvents);
router.get("/LiveEvents", getLiveEvents);
router.get("/FinishedEvents", getFinishedEvents);
router.post("/ChangeToLive", ChangeToLive);
export default router;
