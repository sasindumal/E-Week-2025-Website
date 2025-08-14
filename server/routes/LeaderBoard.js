import { Router } from "express";
const router = Router();
import { addEventResult,getLeaderBoard ,updatePoints} from "../controllers/LeaderBoardController.js";

router.post("/addEvenResult", addEventResult);
router.get("/getLeaderBoard", getLeaderBoard);
router.post("/updatePoints/:team", updatePoints); // Update points for a specific team

export default router;
