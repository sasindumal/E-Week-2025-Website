import LeaderBoard  from "../models/LeaderBoard.js";

export async function addEventResult(req, res) {
  try {
    const {
      eventName,
      eventId,
      E22Rank,
      E23Rank,
      E24Rank,
      E21Rank,
      E22Score,
      E23Score,
      E24Score,
      E21Score,
      E22Points,
      E23Points,
      E24Points,
      E21Points,
    } = req.body;

    // Find the single leaderboard document
    let leaderboard = await LeaderBoard.findOne();

    if (!leaderboard) {
      // Create if not exists
      leaderboard = new LeaderBoard({
        EventName: [eventName],
        EventId: [eventId],
        E22Rank: [E22Rank],
        E23Rank: [E23Rank],
        E24Rank: [E24Rank],
        E21Rank: [E21Rank],
        E22: [E22Score],
        E23: [E23Score],
        E24: [E24Score],
        E21: [E21Score],
        E22Points: E22Score || 0,
        E23Points: E23Score || 0,
        E24Points: E24Score || 0,
        E21Points: E21Score || 0,

    
      });
    } else {
      // Push new data to arrays
      leaderboard.EventName.push(eventName);
      leaderboard.EventId.push(eventId);
      leaderboard.E22Rank.push(E22Rank);
      leaderboard.E23Rank.push(E23Rank);
      leaderboard.E24Rank.push(E24Rank);
      leaderboard.E21Rank.push(E21Rank);
      leaderboard.E22.push(E22Score);
      leaderboard.E23.push(E23Score);
      leaderboard.E24.push(E24Score);
      leaderboard.E21.push(E21Score);

      // Accumulate points
      leaderboard.E22Points = (leaderboard.E22Points || 0) + (E22Score || 0);
      leaderboard.E23Points = (leaderboard.E23Points || 0) + (E23Score || 0);
      leaderboard.E24Points = (leaderboard.E24Points || 0) + (E24Score || 0);
      leaderboard.E21Points = (leaderboard.E21Points || 0) + (E21Score || 0);
    }

    // Save document
    const updated = await leaderboard.save();

    res.status(200).json(updated);

  } catch (error) {
    console.error("Error updating leaderboard:", error);
    res.status(500).json({ error: error.message });
  }
}
