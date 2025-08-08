import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./management.css";
import { Trash, Pencil, RefreshCw } from "lucide-react";

const ManageEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [finishedEvents, setFinishedEvents] = useState([]);
  const [updatingEventId, setUpdatingEventId] = useState(null);
  const [fadingOutIds, setFadingOutIds] = useState([]);

  const handleClick = () => {
    navigate("/admin/EventForm");
  };

  const handleChangetoLive = async (id) => {
    setUpdatingEventId(id);
    setFadingOutIds((prev) => [...prev, id]); // trigger fade out

    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:5000/api/createEvents/ChangeToLive", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId: id }),
        });

        const data = await response.json();

        if (response.ok) {
          fetchLiveEvents();
          fetchUpcomingEvents();
        } else {
          console.error("Error updating event:", data.message || data.error);
        }
      } catch (err) {
        console.error("Network error:", err.message);
      } finally {
        setUpdatingEventId(null);
        setFadingOutIds((prev) => prev.filter((eid) => eid !== id));
      }
    }, 400); // duration matches CSS fade time
  };

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/createEvents/UpcomingEvents");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchLiveEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/createEvents/LiveEvents");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setLiveEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchFinishedEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/createEvents//FinishedEvents");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFinishedEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchLiveEvents();
    fetchFinishedEvents();
    fetchUpcomingEvents();
  }, [liveEvents]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ padding: "2rem", color: "red", flex: 1 }}>
        <h1>Manage Events</h1>
        <p style={{ color: "white" }}>
          This is the Manage Events page where you can create, edit, and delete events.
        </p>
        <button onClick={handleClick} className="create-event-button">
          Create Event
        </button>

        <div className="event-list">
          <h2>Live Events List</h2>
          {liveEvents.length > 0 ? (
            <table className="event-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {liveEvents.map((event) => (
                  <tr key={event._id}>
                    <td>{event.title}</td>
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td>{event.time}</td>
                    <td>{event.location}</td>
                    <td>
                      <button className="create-edit-button"><Pencil size={20} /></button>
                      <button className="create-delete-button"><Trash size={20} /></button>
                      <button className="create-edit-button"><RefreshCw size={20} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No events found.</p>
          )}

          <h2>Upcoming Events List</h2>
          {events.length > 0 ? (
            <table className="event-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event._id}
                    className={fadingOutIds.includes(event._id) ? "fade-out" : ""}
                  >
                    <td>{event.title}</td>
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td>{event.time}</td>
                    <td>{event.location}</td>
                    <td>
                      <button className="create-edit-button"><Pencil size={20} /></button>
                      <button className="create-delete-button"><Trash size={20} /></button>
                      <button
                        className="create-edit-button"
                        onClick={() => handleChangetoLive(event._id)}
                        disabled={updatingEventId === event._id}
                      >
                        {updatingEventId === event._id ? (
                          <span className="spinner"></span>
                        ) : (
                          <RefreshCw size={20} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No events found.</p>
          )}

          <h2>Finished Events List</h2>
          {finishedEvents.length > 0 ? (
            <table className="event-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Champions</th>
                  <th>First RunnerUp</th>
                  <th>Second RunnerUp</th>
                </tr>
              </thead>
              <tbody>
                {finishedEvents.map((event) => (
                  <tr key={event._id}>
                    <td>{event.title}</td>
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td>{event.time}</td>
                    <td>{event.location}</td>
                    <td>{event.winners}</td>
                    <td>{event.firstRuunnerUp}</td>
                    <td>{event.secondRunnerUp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
