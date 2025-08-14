import LeaderBoard from "../models/LeaderBoard.js";

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
    } = req.body;

    // Helper: Calculate improvement using linear regression slope
    function calculateTrendImprovement(scores) {
      if (!scores || scores.length < 2) return null; // Need at least 2 data points

      const n = scores.length;
      const x = Array.from({ length: n }, (_, i) => i + 1); // Event numbers: 1, 2, 3, ...
      const y = scores;

      // Calculate sums
      const sumX = x.reduce((a, b) => a + b, 0);
      const sumY = y.reduce((a, b) => a + b, 0);
      const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
      const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

      // Slope (m) of regression line y = m*x + b
      const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

      // Average score
      const avgY = sumY / n;

      if (avgY === 0) return null;

      // Convert slope into % change per event
      return (m / avgY) * 100;
    }

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
      leaderboard.E22Points =
        (leaderboard.E22Points || 0) + (E22Score || 0);
      leaderboard.E23Points =
        (leaderboard.E23Points || 0) + (E23Score || 0);
      leaderboard.E24Points =
        (leaderboard.E24Points || 0) + (E24Score || 0);
      leaderboard.E21Points =
        (leaderboard.E21Points || 0) + (E21Score || 0);
    }

    // Calculate linear regression trend improvements
    leaderboard.E22Improvement =
      calculateTrendImprovement(leaderboard.E22)?.toFixed(2) || null;
    leaderboard.E23Improvement =
      calculateTrendImprovement(leaderboard.E23)?.toFixed(2) || null;
    leaderboard.E24Improvement =
      calculateTrendImprovement(leaderboard.E24)?.toFixed(2) || null;
    leaderboard.E21Improvement =
      calculateTrendImprovement(leaderboard.E21)?.toFixed(2) || null;

    // Save document
    const updated = await leaderboard.save();

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getLeaderBoard(req, res) {
  try {
    const leaderboard = await LeaderBoard.findOne();

    if (!leaderboard) {
      return res.status(404).json({ error: "Leaderboard not found" });
    }

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updatePoints(req, res) {
  try {
    const { team } = req.params; // e.g., "E22"
    const { points } = req.body; // new points value

    // Build dynamic property name, e.g., "E22Points"
    const fieldName = `${team}Points`;

    // Update the leaderboard directly
    const leaderboard = await LeaderBoard.findOneAndUpdate(
      {},
      { $set: { [fieldName]: Number(points) } },
      { new: true }
    );

    if (!leaderboard) {
      return res.status(404).json({ error: "Leaderboard not found" });
    }

    res.json({
      message: `${fieldName} updated successfully`,
      leaderboard
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
