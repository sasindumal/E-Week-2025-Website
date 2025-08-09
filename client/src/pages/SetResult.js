import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";  // <-- import useNavigate
import "./SetResult.css";

const SetResult = () => {
  const location = useLocation();
  const navigate = useNavigate();  // <-- initialize navigate
  const eventId = location.state?.eventId || "";

  const [formData, setFormData] = useState({
    winners: "",
    firstRunnerUp: "",
    secondRunnerUp: "",
    thirdRunnerUp: "",
    status: "finished",
  });

  const [loading, setLoading] = useState(false);

  const options = ["E21", "E22", "E23", "E24"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hasDuplicates = () => {
    const selections = [
      formData.winners,
      formData.firstRunnerUp,
      formData.secondRunnerUp,
      formData.thirdRunnerUp,
    ];
    const filtered = selections.filter(Boolean);
    const unique = new Set(filtered);
    return unique.size !== filtered.length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasDuplicates()) {
      alert("Please select different participants for each position.");
      return;
    }

    const payload = {
      eventId,
      ...formData,
    };

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/createEvents/terminateEvent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to set result");
      }

      alert("Result successfully saved!");

      // Navigate back after successful submit
      navigate(-1); // Go back one step in history

      // Or you can navigate to a specific path:
      // navigate("/events"); 
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
        {/* your select inputs here unchanged */}
        <label>
          Winner:
          <select
            name="winners"
            value={formData.winners}
            onChange={handleChange}
            required
          >
            <option value="">Select Winner</option>
            {options.map((opt) => (
              <option
                key={opt}
                value={opt}
                disabled={Object.values(formData).includes(opt) && formData.winners !== opt}
              >
                {opt}
              </option>
            ))}
          </select>
        </label>

        <label>
          First Runner-Up:
          <select
            name="firstRunnerUp"
            value={formData.firstRunnerUp}
            onChange={handleChange}
            required
          >
            <option value="">Select First Runner-Up</option>
            {options.map((opt) => (
              <option
                key={opt}
                value={opt}
                disabled={Object.values(formData).includes(opt) && formData.firstRunnerUp !== opt}
              >
                {opt}
              </option>
            ))}
          </select>
        </label>

        <label>
          Second Runner-Up:
          <select
            name="secondRunnerUp"
            value={formData.secondRunnerUp}
            onChange={handleChange}
            required
          >
            <option value="">Select Second Runner-Up</option>
            {options.map((opt) => (
              <option
                key={opt}
                value={opt}
                disabled={Object.values(formData).includes(opt) && formData.secondRunnerUp !== opt}
              >
                {opt}
              </option>
            ))}
          </select>
        </label>

        <label>
          Third Runner-Up:
          <select
            name="thirdRunnerUp"
            value={formData.thirdRunnerUp}
            onChange={handleChange}
            required
          >
            <option value="">Select Third Runner-Up</option>
            {options.map((opt) => (
              <option
                key={opt}
                value={opt}
                disabled={Object.values(formData).includes(opt) && formData.thirdRunnerUp !== opt}
              >
                {opt}
              </option>
            ))}
          </select>
        </label>

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
