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

/*export async function getEvents(req, res) {
  try {
    const events = await find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}*/
