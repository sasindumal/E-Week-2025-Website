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

// Sample teams and participants data for batch-based retrieval
const teamsData = [
  {
    id: "team_1",
    name: "Code Warriors",
    batch: "E21",
    eventId: 1,
    members: [
      {
        id: "p1",
        name: "Arun Kumar",
        batch: "E21",
        eventId: 1,
        isCaptain: true,
        email: "arun@example.com",
        studentId: "E21001",
      },
      {
        id: "p2",
        name: "Priya Singh",
        batch: "E21",
        eventId: 1,
        email: "priya@example.com",
        studentId: "E21002",
      },
      {
        id: "p3",
        name: "Raj Patel",
        batch: "E21",
        eventId: 1,
        email: "raj@example.com",
        studentId: "E21003",
      },
      {
        id: "p4",
        name: "Sara Ahmed",
        batch: "E21",
        eventId: 1,
        email: "sara@example.com",
        studentId: "E21004",
      },
    ],
  },
  {
    id: "team_2",
    name: "Tech Titans",
    batch: "E21",
    eventId: 1,
    members: [
      {
        id: "p5",
        name: "Vikram Das",
        batch: "E21",
        eventId: 1,
        isCaptain: true,
        email: "vikram@example.com",
        studentId: "E21005",
      },
      {
        id: "p6",
        name: "Anita Roy",
        batch: "E21",
        eventId: 1,
        email: "anita@example.com",
        studentId: "E21006",
      },
      {
        id: "p7",
        name: "Dev Sharma",
        batch: "E21",
        eventId: 1,
        email: "dev@example.com",
        studentId: "E21007",
      },
      {
        id: "p8",
        name: "Meera Joshi",
        batch: "E21",
        eventId: 1,
        email: "meera@example.com",
        studentId: "E21008",
      },
    ],
  },
  {
    id: "team_3",
    name: "Digital Dynamos",
    batch: "E22",
    eventId: 1,
    members: [
      {
        id: "p9",
        name: "Arjun Reddy",
        batch: "E22",
        eventId: 1,
        isCaptain: true,
        email: "arjun@example.com",
        studentId: "E22001",
      },
      {
        id: "p10",
        name: "Kavya Nair",
        batch: "E22",
        eventId: 1,
        email: "kavya@example.com",
        studentId: "E22002",
      },
      {
        id: "p11",
        name: "Rohit Gupta",
        batch: "E22",
        eventId: 1,
        email: "rohit@example.com",
        studentId: "E22003",
      },
      {
        id: "p12",
        name: "Shreya Verma",
        batch: "E22",
        eventId: 1,
        email: "shreya@example.com",
        studentId: "E22004",
      },
    ],
  },
  {
    id: "team_4",
    name: "Innovation Squad",
    batch: "E22",
    eventId: 2,
    members: [
      {
        id: "p13",
        name: "Karan Malhotra",
        batch: "E22",
        eventId: 2,
        isCaptain: true,
        email: "karan@example.com",
        studentId: "E22005",
      },
      {
        id: "p14",
        name: "Pooja Mehta",
        batch: "E22",
        eventId: 2,
        email: "pooja@example.com",
        studentId: "E22006",
      },
      {
        id: "p15",
        name: "Nikhil Rao",
        batch: "E22",
        eventId: 2,
        email: "nikhil@example.com",
        studentId: "E22007",
      },
    ],
  },
  {
    id: "team_5",
    name: "Robo Rangers",
    batch: "E23",
    eventId: 2,
    members: [
      {
        id: "p16",
        name: "Amrita Singh",
        batch: "E23",
        eventId: 2,
        isCaptain: true,
        email: "amrita@example.com",
        studentId: "E23001",
      },
      {
        id: "p17",
        name: "Rajesh Kumar",
        batch: "E23",
        eventId: 2,
        email: "rajesh@example.com",
        studentId: "E23002",
      },
      {
        id: "p18",
        name: "Divya Pandey",
        batch: "E23",
        eventId: 2,
        email: "divya@example.com",
        studentId: "E23003",
      },
      {
        id: "p19",
        name: "Ashwin Iyer",
        batch: "E23",
        eventId: 2,
        email: "ashwin@example.com",
        studentId: "E23004",
      },
    ],
  },
];

// Individual participants for individual events
const individualParticipants = [
  {
    id: "ind_1",
    name: "Rahul Krishnan",
    batch: "E21",
    eventId: 3,
    email: "rahul@example.com",
    studentId: "E21009",
  },
  {
    id: "ind_2",
    name: "Nisha Agarwal",
    batch: "E21",
    eventId: 3,
    email: "nisha@example.com",
    studentId: "E21010",
  },
  {
    id: "ind_3",
    name: "Deepak Jain",
    batch: "E22",
    eventId: 3,
    email: "deepak@example.com",
    studentId: "E22008",
  },
  {
    id: "ind_4",
    name: "Ritu Chopra",
    batch: "E22",
    eventId: 3,
    email: "ritu@example.com",
    studentId: "E22009",
  },
  {
    id: "ind_5",
    name: "Suresh Pillai",
    batch: "E23",
    eventId: 3,
    email: "suresh@example.com",
    studentId: "E23005",
  },
  {
    id: "ind_6",
    name: "Preet Kaur",
    batch: "E23",
    eventId: 3,
    email: "preet@example.com",
    studentId: "E23006",
  },
];

// Get teams and participants by event and batch
router.get("/events/:eventId/batches/:batch/teams", (req, res) => {
  const { eventId, batch } = req.params;

  const teams = teamsData.filter(
    (team) => team.eventId === parseInt(eventId) && team.batch === batch,
  );

  const participants = individualParticipants.filter(
    (participant) =>
      participant.eventId === parseInt(eventId) && participant.batch === batch,
  );

  res.json({ teams, participants });
});

// Get all batches for an event
router.get("/events/:eventId/batches", (req, res) => {
  const { eventId } = req.params;

  const teamBatches = [
    ...new Set(
      teamsData
        .filter((team) => team.eventId === parseInt(eventId))
        .map((team) => team.batch),
    ),
  ];

  const participantBatches = [
    ...new Set(
      individualParticipants
        .filter((participant) => participant.eventId === parseInt(eventId))
        .map((participant) => participant.batch),
    ),
  ];

  const allBatches = [
    ...new Set([...teamBatches, ...participantBatches]),
  ].sort();

  res.json(allBatches);
});

// Get teams by batch (all events)
router.get("/batches/:batch/teams", (req, res) => {
  const { batch } = req.params;

  const teams = teamsData.filter((team) => team.batch === batch);
  const participants = individualParticipants.filter(
    (participant) => participant.batch === batch,
  );

  res.json({ teams, participants });
});

// Complete event with winners
router.post("/events/:eventId/complete", (req, res) => {
  const { eventId } = req.params;
  const { winners } = req.body;

  // In a real app, this would update the database
  console.log(`Completing event ${eventId} with winners:`, winners);

  res.json({
    success: true,
    message: `Event ${eventId} completed successfully`,
    leaderboardUpdated: true,
  });
});

module.exports = router;
