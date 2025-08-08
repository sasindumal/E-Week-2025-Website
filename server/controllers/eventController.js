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
    const events = (await eventSchema.find({ status: "Finished" })
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

