import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./management.css";
import { Trash, Pencil, RefreshCw } from "lucide-react";
import { Square } from "lucide-react";
import { MapPin } from "lucide-react";
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

const handleDelete = async (id) => {
  try {
    const response = await fetch("http://localhost:5000/api/createEvents/deleteEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId: id }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete event");
    }

    // Add id to fadingOutIds to trigger animation
    setFadingOutIds((prev) => [...prev, id]);

    // Wait for animation duration (e.g., 500ms)
    setTimeout(() => {
      // Remove the event from your states AFTER animation ends
      setEvents((prev) => prev.filter((event) => event._id !== id));
      setLiveEvents((prev) => prev.filter((event) => event._id !== id));
      setFinishedEvents((prev) => prev.filter((event) => event._id !== id));

      // Clean up fadingOutIds list
      setFadingOutIds((prev) => prev.filter((fadeId) => fadeId !== id));
    }, 700); // duration should match your CSS animation time

  } catch (error) {
    console.error("Delete event error:", error);
    alert("Failed to delete event: " + error.message);
  }
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
    }, 700); // duration matches CSS fade time
  };

const handleEndEdit = async (id) => {
  navigate("/admin/SetResult", { state: { eventId: id } });
}




  const handleEdit = (id) => {
    navigate("/admin/EditableEventForm", { state: { eventId: id } });
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
    <div style={{ minHeight: "100vh" }}>
      {/* Sidebar is fixed with width 240px inside sidebar component */}
      <Sidebar activeEvents={liveEvents.length} />

      {/* Main content container with marginLeft to avoid overlap */}
      <div style={{ marginLeft: "240px", padding: "2rem", color: "red" }}>
        <h1>Manage Events</h1>
        <p style={{ color: "white" }}>
          This is the Manage Events page where you can create, edit, and delete events.
        </p>
        <button onClick={handleClick} className="create-event-button">
          Create Event
        </button>

        {/* Your existing tables and event list rendering */}
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
                   
                   <td>
                  <MapPin size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
                  {event.location}
                   </td>
                    <td>
                      <button className="create-edit-button" title="Edit Event" onClick={() => handleEdit(event._id)}><Pencil size={20} /></button>
                      <button className="create-delete-button" title="Delete Event" onClick={() => handleDelete(event._id)}><Trash size={20} /></button>
                      <button className="create-edit-button" title="Stop Live Streaming" onClick={() => handleEndEdit(event._id)}><Square size={20} /></button>
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
                    
                     <td>
                    <MapPin size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
                    {event.location}
                     </td>
                    <td>
                      <button className="create-edit-button" title="Edit Event" onClick={() => handleEdit(event._id)}><Pencil size={20} /></button>
                      <button className="create-delete-button" title="Delete Event" onClick={() => handleDelete(event._id)}><Trash size={20} /></button>
                      <button
                        className="create-edit-button"
                        title="Change to Live"
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
                  <th>Champions</th>
                  <th>First RunnerUp</th>
                  <th>Second RunnerUp</th>
                </tr>
              </thead>
              <tbody>
                {finishedEvents.map((event) => (
                  <tr key={event._id}>
                    <td>{event.title}</td>
                    <td>{event.winners}</td>
                    <td>{event.firstRunnerUp}</td>
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