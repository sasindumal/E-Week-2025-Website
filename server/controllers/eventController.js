import eventSchema from "../models/Events.js";

export async function createEvent(req, res) {
  try {
    const event = new eventSchema(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getEvents(req, res) {
  try {
    const events = await eventSchema.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUpcomingEvents(req, res) {
  try {
    const events = (await eventSchema.find({ status: "upcoming"  })
    .sort({ date: 1 ,time:1}) // Sort by date and time in descending order
    )
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getLiveEvents(req, res) {
  try {
    const events = (await eventSchema.find({ status: "Live" })
    .sort({ date: 1, time: 1 }));
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getFinishedEvents(req, res) {
  try {
    const events = (await eventSchema.find({ status: "finished" })
    .sort({ date: 1, time: 1 }));;
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function ChangeToLive(req, res) {
  try {
    const { eventId } = req.body; // assuming you're sending the event ID in the request body

    const updatedEvent = await eventSchema.findOneAndUpdate(
      { _id: eventId, status: "upcoming" },
      { $set: { status: "Live" } },
      { new: true } // returns the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found or not upcoming" });
    }

    res.json({ message: "Event status updated to live", event: updatedEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function getEventsById(req, res) {
  try {
    const { eventId } = req.body; 
    const event = await eventSchema.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function UpdateEventsById(req, res) {
  try {
    const { eventId, ...updateData } = req.body; // Extract eventId and the fields to update

    if (!eventId) {
      return res.status(400).json({ error: "Missing event ID (_id)" });
    }

    // Find the event by ID and update it with the new data
    const updatedEvent = await eventSchema.findByIdAndUpdate(eventId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Optional: run schema validators
    })

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function terminateEvent(req, res) {
  try {
    const { eventId, ...updateData } = req.body; // Extract eventId and the fields to update

    if (!eventId) {
      return res.status(400).json({ error: "Missing event ID (_id)" });
    }

    // Find the event by ID and update it with the new data
    const updatedEvent = await eventSchema.findByIdAndUpdate(eventId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Optional: run schema validators
    });

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function deleteEvent(req, res) {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: "Missing event ID (_id)" });
    }

    // Find the event by ID and delete it
    const deletedEvent = await eventSchema.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

