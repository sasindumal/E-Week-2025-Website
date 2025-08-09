import { Router } from "express";
const router = Router();
import { createEvent,getEvents,getLiveEvents,getFinishedEvents,
    getUpcomingEvents,ChangeToLive,getEventsById,UpdateEventsById,terminateEvent,deleteEvent } from "../controllers/eventController.js";

router.post("/createEvents", createEvent);
router.get("/getEvents", getEvents);
router.get("/UpcomingEvents", getUpcomingEvents);
router.get("/LiveEvents", getLiveEvents);
router.get("/FinishedEvents", getFinishedEvents);
router.post("/ChangeToLive", ChangeToLive);
router.post("/getEventsById", getEventsById);
router.post("/UpdateEventsById",UpdateEventsById)
router.post("/terminateEvent", terminateEvent);
router.post("/deleteEvent", deleteEvent);
export default router;
