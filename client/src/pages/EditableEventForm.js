import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditableEventForm = () => {
 const location = useLocation();
  const eventId = location.state?.eventId;
  const navigate = useNavigate();

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
    thirdRunnerUp: "",
    maxTeamsPerBatch: "",
  });

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/createEvents/getEventsById",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventId }),
          }
        );
        if (!res.ok) throw new Error("Failed to fetch event");


        const data = await res.json();
   console.log("Fetched event data:", data);
setFormData({
  title: data.title || "",
  date: data.date ? data.date.split("T")[0] : "",
  time: data.time || "",
  location: data.location || "",
  eventType: data.eventType || "Individual",
  MaxNoOfParticipantsPerTeam: data.MaxNoOfParticipantsPerTeam || "",
  description: data.description || "",
  status: data.status || "upcoming",
  category: data.category || "",
  pointsConfiguration: data.pointsConfiguration
    ? data.pointsConfiguration.join(",")
    : "",
  winners: data.winners || "",
  firstRunnerUp: data.firstRunnerUp || "",
  secondRunnerUp: data.secondRunnerUp || "",
  maxTeamsPerBatch: data.maxTeamsPerBatch || "",
});

      } catch (err) {
        console.error(err);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for sending (convert numbers and points array)
    const finalData = {
        eventId,
      ...formData,
      MaxNoOfParticipantsPerTeam: Number(formData.MaxNoOfParticipantsPerTeam),
      maxTeamsPerBatch: Number(formData.maxTeamsPerBatch),
      pointsConfiguration: formData.pointsConfiguration
        .split(",")
        .map((n) => Number(n.trim()))
        .filter((n) => !isNaN(n)),
    };

   try {
  const response = await fetch("http://localhost:5000/api/createEvents/UpdateEventsById", {
    method: "POST", // 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finalData),
  });
  console.log("Sending data:", finalData);

  if (response.ok) {
    alert("Event updated successfully!");
    navigate("/admin/ManageEvents"); // navigate back after successful update
  } else {
    const errorData = await response.json();
    alert("Update failed: " + (errorData.message || "Unknown error"));
  }
} catch (err) {
  console.error("Network error:", err);
  alert("Network error occurred");
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
        Edit Event
      </h2>

      {[
        { label: "Title", name: "title", type: "text", placeholder: "Title" },
        { label: "Date", name: "date", type: "date" },
        { label: "Time", name: "time", type: "time" },
        { label: "Location", name: "location", type: "text", placeholder: "Location" },
        {
          label: "Max Number of Teams/Individuals per Batch",
          name: "maxTeamsPerBatch",
          type: "number",
          placeholder: "e.g. 100",
        },
        {
          label: "Description",
          name: "description",
          type: "textarea",
          placeholder: "Description",
        },
        { label: "Status", name: "status", type: "text", placeholder: "Status" },
        { label: "Category", name: "category", type: "text", placeholder: "Category" },
        {
          label: "Points Configuration",
          name: "pointsConfiguration",
          type: "text",
          placeholder: "Comma-separated points (e.g. 10,8,6)",
        },
        {
          label: "Max Players Per Team",
          name: "MaxNoOfParticipantsPerTeam",
          type: "number",
          placeholder: "e.g. 5",
        },
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
        Update Event
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

export default EditableEventForm;
