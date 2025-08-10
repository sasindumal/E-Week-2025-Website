import { Router } from "express";
const router = Router();
import { addEventResult } from "../controllers/LeaderBoardController.js";

router.post("/addEvenResult", addEventResult);

export default router;
