import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Eye, Edit } from "lucide-react";
import "./AdminLeaderBoard.css";
import { useNavigate } from "react-router-dom";

const AdminLeaderBoard = () => {
  const [leaderBoardRows, setLeaderBoardRows] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const navigate= useNavigate();
  const handleEditPoints = (team,points) => {
    navigate(`/admin/edit-points/${team}/${points}`); // Navigate to edit points page with team name
    
  };
  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/createEvents/UpcomingEvents"
      );
      if (!response.ok) throw new Error("Failed to fetch upcoming events");
      const data = await response.json();
      setUpcomingEvents(data);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  };

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const response = await fetch("/api/leaderboard/getLeaderBoard");
        if (!response.ok) throw new Error("Failed to fetch leaderboard data");
        const data = await response.json();
        const teams = ["E21", "E22", "E23", "E24"];
        const teamData = teams.map((team) => {
          const rankArray = data[`${team}Rank`] || [];
          const totalWonEvents = rankArray.filter(
            (rank) => rank && rank.toLowerCase() === "winners"
          ).length;
          const members = Math.floor(Math.random() * 10) + 40;

          return {
            team,
            members,
            points: data[`${team}Points`] || 0,
            totalWonEvents,
            podiums: rankArray.filter(
              (rank) => rank && rank.toLowerCase() !== "thirdrunnerup"
            ).length,
            improvement: data[`${team}Improvement`] || 0,
          };
        });

        const sortedTeams = teamData.sort((a, b) => b.points - a.points);
        setLeaderBoardRows(sortedTeams);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderBoard();
    fetchUpcomingEvents();
  }, []);

  const getRowBackground = (rank) => {
    if (rank === 1)
      return "linear-gradient(90deg, #4a2c0a 0%, #7a4f1a 100%)"; // Gold-brown
    if (rank === 2)
      return "linear-gradient(90deg, #2a1a3d 0%, #4a2a5d 100%)"; // Purple
    return "linear-gradient(90deg, #1a1a2e 0%, #2e2e4a 100%)"; // Dark gradient
  };

  return (
    <div className="admin-leaderboard">
      <Sidebar />
      <main>
        
        <h1>Leaderboard Management</h1>
        <p className="subtitle">
          Manage competition scores, batch rankings, and event results
        </p>

        <div className="buttons-container">
          <button className="button-batch" title="View Batch Rankings">
            🏆 Batch Rankings
          </button>
          <button className="button-event" title="View Event Scores">
            Event Scores
          </button>
        </div>

        <div className="stats-container">
          <div className="stats-card">
            <p className="stats-number">4</p>
            <p className="stats-label">Active Teams</p>
          </div>

          <div className="stats-card">
            <p className="stats-number">
              {leaderBoardRows.reduce((sum, row) => sum + row.totalWonEvents, 0)}
            </p>
            <p className="stats-label">Total Wins</p>
          </div>

          <div className="stats-card">
            <p className="stats-number">{upcomingEvents.length}</p>
            <p className="stats-label">Events to Win</p>
          </div>
        </div>

        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Batch</th>
              <th>Total Points</th>
              <th>Events Won</th>
              <th>Podiums</th>
              <th>Improvement</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {leaderBoardRows.map((row, i) => {
              const rank = i + 1;
              const bgValue = getRowBackground(rank);

              return (
                <tr
                  key={row.team}
                  className="leaderboard-row"
                  style={{
                    background: bgValue,
                    borderRadius: "10px",
                    marginBottom: "0.5rem",
                  }}
                >
                  <td
                    style={{
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                      fontWeight: "700",
                      color: "#93c5fd",
                      padding: "20px",
                      fontSize: "18px",
                    }}
                  >
                    #{rank}
                  </td>
                  <td
                    style={{
                      fontWeight: "600",
                      padding: "20px",
                      fontSize: "18px",
                    }}
                  >
                    <div>{row.team}</div>
                    <div style={{ fontSize: "14px", color: "#a1a1aa" }}>
                      {row.members} members
                    </div>
                  </td>
                  <td
                    style={{
                      fontWeight: "700",
                      padding: "20px",
                      fontSize: "18px",
                    }}
                  >
                    {row.points.toLocaleString()}
                    <div
                      style={{
                        fontSize: "14px",
                        color: row.improvement >= 0 ? "#10b981" : "#ef4444",
                      }}
                    >
                      {row.improvement >= 0
                        ? `+${row.improvement.toFixed(1)}%`
                        : `${row.improvement.toFixed(1)}%`}
                    </div>
                  </td>
                  <td style={{ padding: "20px", fontSize: "18px" }}>
                    {row.totalWonEvents}
                  </td>
                  <td style={{ padding: "20px", fontSize: "18px" }}>
                    {row.podiums}
                  </td>
                  <td
                    style={{
                      fontWeight: "600",
                      color: row.improvement >= 0 ? "#10b981" : "#ef4444",
                      padding: "20px",
                      fontSize: "18px",
                    }}
                  >
                    {row.improvement >= 0
                      ? `+${row.improvement.toFixed(1)}%`
                      : `${row.improvement.toFixed(1)}%`}
                  </td>
                  <td
                    style={{
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <div className="action-buttons">
                      <button
                        className="action-button view"
                        title="View Details"
                        type="button"
                      >
                        <Eye size={30} />
                      </button>
                      <button 
                        onClick={() => handleEditPoints(row.team,row.points)}
                        className="action-button edit"
                        title="Edit Points"
                        type="button"
                      >
                        <Edit size={30} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminLeaderBoard;
