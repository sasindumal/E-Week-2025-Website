import React, { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    eventType: "Individual",
    MaxNoOfParticipantsPerTeam: "",
    description: "",
    status: "upcoming",
    category: "",
    pointsConfiguration: "",
    winners: "",
    firstRunnerUp: "",
    secondRunnerUp: "",
    maxTeamsPerBatch: "",
     expectedFinishTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      MaxNoOfParticipantsPerTeam: Number(formData.MaxNoOfParticipantsPerTeam),
      maxTeamsPerBatch: Number(formData.maxTeamsPerBatch),
      pointsConfiguration: formData.pointsConfiguration
        ? formData.pointsConfiguration
            .split(",")
            .map((n) => Number(n.trim()))
            .filter((n) => !isNaN(n))
        : [],
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/createEvents/createEvents",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );

      if (response.ok) {
        alert("Event created successfully!");
        setFormData({
          title: "",
          date: "",
          time: "",
          location: "",
          eventType: "Individual",
          MaxNoOfParticipantsPerTeam: "",
          description: "",
          status: "upcoming",
          category: "",
          pointsConfiguration: "",
          winners: "",
          firstRunnerUp: "",
          secondRunnerUp: "",
          maxTeamsPerBatch: "",
           expectedFinishTime: "",
        });
      } else {
        const errorData = await response.json();
        alert("Failed: " + (errorData.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Network error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#1e1e2f",
        color: "#fff",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "red" }}>
        Create New Event
      </h2>

      {[
        { label: "Title", name: "title", type: "text", placeholder: "Title" },
        { label: "Date", name: "date", type: "date" },
        { label: "Time", name: "time", type: "time" },
         { label: "Finish Time", name: "expectedFinishTime", type: "time" },
        { label: "Location", name: "location", type: "text", placeholder: "Location" },
        {
          label: "Max Number of Teams/Individual per Batch",
          name: "maxTeamsPerBatch",
          type: "number",
          placeholder: "e.g. 100",
        },
        { label: "Description", name: "description", type: "textarea", placeholder: "Description" },
        { label: "Status", name: "status", type: "text", placeholder: "Status (e.g. upcoming)" },
        { label: "Points Configuration", name: "pointsConfiguration", type: "text", placeholder: "10,8,6" },
        { label: "Max Players Per Team", name: "MaxNoOfParticipantsPerTeam", type: "number", placeholder: "e.g. 5" },
      ].map((input) => (
        <div key={input.name} style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "0.25rem", color: "#ccc" }}>{input.label}</label>
          {input.type === "textarea" ? (
            <textarea
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={handleChange}
              style={inputStyle}
            />
          ) : (
            <input
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={handleChange}
              style={inputStyle}
            />
          )}
        </div>
      ))}

      {/* Category select */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "0.25rem", color: "#ccc" }}>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Category</option>
          <option value="Competition">Competition</option>
          <option value="Workshop">Workshop</option>
          <option value="Conference">Conference</option>
          <option value="Ceremony">Ceremony</option>
          <option value="Social">Social</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Event type */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ color: "#ccc" }}>Event Type:</label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Individual">Individual</option>
          <option value="Team">Team</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          padding: "0.75rem",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Create Event
      </button>
    </form>
  );
};

const inputStyle = {
  padding: "0.75rem",
  borderRadius: "0.5rem",
  border: "1px solid #333",
  backgroundColor: "#2a2a40",
  color: "white",
  width: "100%",
  boxSizing: "border-box",
};

export default EventForm;
