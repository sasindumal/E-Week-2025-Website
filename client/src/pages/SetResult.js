import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SetResult.css";

const SetResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventId = location.state?.eventId || "";

  const [event, setEvent] = useState({});
  const [formData, setFormData] = useState({
    winners: "",
    firstRunnerUp: "",
    secondRunnerUp: "",
    thirdRunnerUp: "",
    status: "finished",
  });

  const [secondFormData, setSecondFormData] = useState({
    eventId: eventId,
    eventName: "",
    E22Rank: "",
    E23Rank: "",
    E24Rank: "",
    E21Rank: "",
    E22Score: "",
    E23Score: "",
    E24Score: "",
    E21Score: "",
  });

  const [loading, setLoading] = useState(false);

  const options = ["E21", "E22", "E23", "E24"];

  // Handle dropdown changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Check if same participant is selected twice
  const hasDuplicates = () => {
    const selections = [
      formData.winners,
      formData.firstRunnerUp,
      formData.secondRunnerUp,
      formData.thirdRunnerUp,
    ].filter(Boolean);
    return new Set(selections).size !== selections.length;
  };

  // Fetch event data once
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/createEvents/getEventsById",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventId }),
          }
        );
        if (!response.ok) throw new Error("Failed to fetch event details");
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  // Update secondFormData whenever event or formData changes
  useEffect(() => {
    if (!event.pointsConfiguration) return;

    const positionOrder = [
      "winners",
      "firstRunnerUp",
      "secondRunnerUp",
      "thirdRunnerUp",
    ];
    const scores = event.pointsConfiguration;

    const updatedFormData = {
      eventId: eventId,
      eventName: event.title || "",
      E22Rank: "",
      E23Rank: "",
      E24Rank: "",
      E21Rank: "",
      E22Score: "",
      E23Score: "",
      E24Score: "",
      E21Score: "",
    };

    positionOrder.forEach((position, index) => {
      const team =
        position === "winners"
          ? formData.winners || event.winners
          : position === "firstRunnerUp"
          ? formData.firstRunnerUp || event.firstRunnerUp
          : position === "secondRunnerUp"
          ? formData.secondRunnerUp || event.secondRunnerUp
          : formData.thirdRunnerUp || event.thirdRunnerUp;

      if (team) {
        updatedFormData[`${team}Rank`] = position;
        updatedFormData[`${team}Score`] = scores[index];
      }
    });

    setSecondFormData(updatedFormData);
  }, [event, eventId, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasDuplicates()) {
      alert("Please select different participants for each position.");
      return;
    }

    try {
      setLoading(true);

      // Save results to terminateEvent endpoint
      const res = await fetch(
        "http://localhost:5000/api/createEvents/terminateEvent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, ...formData }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to set result");
      }

      // Save results to leaderboard
      const lbRes = await fetch(
        "http://localhost:5000/api/LeaderBoard/addEvenResult",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(secondFormData),
        }
      );

      if (!lbRes.ok) throw new Error("Failed to update leaderboard");

      alert("Result successfully saved!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Error saving result: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="set-result-page">
      <h1 className="page-title">Set Event Result</h1>

      <form onSubmit={handleSubmit} className="result-form">
        {["winners", "firstRunnerUp", "secondRunnerUp", "thirdRunnerUp"].map(
          (position, idx) => (
            <label key={position}>
              {position.replace(/([A-Z])/g, " $1")}:{" "}
              <select
                name={position}
                value={formData[position]}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select {position.replace(/([A-Z])/g, " $1")}
                </option>
                {options.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    disabled={
                      Object.values(formData).includes(opt) &&
                      formData[position] !== opt
                    }
                  >
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          )
        )}

        <button
          type="submit"
          className="create-edit-button save-button"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Results"}
        </button>
      </form>
    </div>
  );
};

export default SetResult;
