const express = require("express");
const router = express.Router();

// Sample data for demo
const events = [
  {
    id: 1,
    title: "Programming Contest",
    date: "2025-08-25",
    time: "9:00 AM - 12:00 PM",
    location: "Computer Lab A",
    participants: "Individual",
    description:
      "Test your coding skills in our challenging programming competition",
    category: "Technical",
  },
  {
    id: 2,
    title: "Robotics Challenge",
    date: "2025-08-26",
    time: "2:00 PM - 5:00 PM",
    location: "Engineering Workshop",
    participants: "Teams of 3-4",
    description: "Design and build robots to complete specific tasks",
    category: "Engineering",
  },
  {
    id: 3,
    title: "Innovation Pitch",
    date: "2025-08-27",
    time: "10:00 AM - 1:00 PM",
    location: "Main Auditorium",
    participants: "Teams of 2-5",
    description: "Present your innovative solutions to real-world problems",
    category: "Innovation",
  },
];

const leaderboard = [
  {
    id: 1,
    rank: 1,
    team: "CodeCrafters",
    score: 2850,
    events: ["Programming Contest", "Hackathon", "Circuit Design"],
    points: {
      programming: 950,
      robotics: 0,
      innovation: 900,
      engineering: 1000,
    },
  },
  {
    id: 2,
    rank: 2,
    team: "TechTitans",
    score: 2650,
    events: ["Robotics Challenge", "Innovation Pitch", "Programming Contest"],
    points: {
      programming: 800,
      robotics: 950,
      innovation: 900,
      engineering: 0,
    },
  },
];

const galleryItems = [
  {
    id: 1,
    year: "2024",
    title: "Programming Contest Winners",
    image:
      "https://via.placeholder.com/600x400/110921/ffffff?text=Programming+Contest",
    views: 1250,
    likes: 89,
  },
  {
    id: 2,
    year: "2024",
    title: "Robotics Challenge",
    image:
      "https://via.placeholder.com/600x400/a71c20/ffffff?text=Robotics+Challenge",
    views: 950,
    likes: 67,
  },
];

// Routes
router.get("/health", (req, res) => {
  res.json({ status: "OK", message: "E-Week 2025 API is running" });
});

router.get("/events", (req, res) => {
  const { category } = req.query;
  let filteredEvents = events;

  if (category && category !== "All") {
    filteredEvents = events.filter((event) => event.category === category);
  }

  res.json(filteredEvents);
});

router.get("/events/:id", (req, res) => {
  const event = events.find((e) => e.id === parseInt(req.params.id));
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(event);
});

router.get("/leaderboard", (req, res) => {
  res.json(leaderboard);
});

router.get("/gallery", (req, res) => {
  const { year } = req.query;
  let filteredItems = galleryItems;

  if (year && year !== "All") {
    filteredItems = galleryItems.filter((item) => item.year === year);
  }

  res.json(filteredItems);
});

router.post("/register", (req, res) => {
  const { eventId, teamName, members } = req.body;

  // Simulate registration
  res.json({
    success: true,
    message: `Successfully registered ${teamName} for event ${eventId}`,
    registrationId: Date.now(),
  });
});

module.exports = router;
