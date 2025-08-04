const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "OK", message: "E-Week 2025 API is running with Prisma" });
});

// Get all events with optional category filter
router.get("/events", async (req, res) => {
  try {
    const { category } = req.query;
    let whereClause = {};
    
    if (category && category !== "All") {
      whereClause.category = category;
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: { date: 'asc' }
    });

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get specific event by ID
router.get("/events/:id", async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await prisma.leaderboard.findMany({
      include: {
        batch: true,
        team: {
          include: {
            members: {
              include: {
                participant: true
              }
            }
          }
        },
        participant: true
      },
      orderBy: { rank: 'asc' }
    });

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get gallery items with optional year filter
router.get("/gallery", async (req, res) => {
  try {
    const { year } = req.query;
    let whereClause = {};
    
    if (year && year !== "All") {
      whereClause.year = parseInt(year);
    }

    const galleryItems = await prisma.gallery.findMany({
      where: whereClause,
      include: {
        event: true,
        uploader: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(galleryItems);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// Register for an event
router.post("/register", async (req, res) => {
  try {
    const { eventId, teamName, members, registrationType } = req.body;

    if (registrationType === 'team') {
      // Create team registration
      const team = await prisma.team.create({
        data: {
          name: teamName,
          batchId: 1, // Default batch, should be dynamic
          eventId: parseInt(eventId),
          captainId: members[0].id,
          teamCode: `TM${Date.now()}`,
          status: 'registered'
        }
      });

      // Create team members
      for (const member of members) {
        await prisma.teamMember.create({
          data: {
            teamId: team.id,
            participantId: member.id,
            isCaptain: member.isCaptain || false
          }
        });
      }

      // Create event registration
      await prisma.eventRegistration.create({
        data: {
          eventId: parseInt(eventId),
          teamId: team.id,
          registrationType: 'team',
          status: 'registered'
        }
      });

      res.json({
        success: true,
        message: `Successfully registered team ${teamName} for event ${eventId}`,
        registrationId: team.id
      });
    } else {
      // Individual registration
      const registration = await prisma.eventRegistration.create({
        data: {
          eventId: parseInt(eventId),
          participantId: members[0].id,
          registrationType: 'individual',
          status: 'registered'
        }
      });

      res.json({
        success: true,
        message: `Successfully registered participant for event ${eventId}`,
        registrationId: registration.id
      });
    }
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ error: 'Failed to register for event' });
  }
});

// Get teams and participants by event and batch
router.get("/events/:eventId/batches/:batch/teams", async (req, res) => {
  try {
    const { eventId, batch } = req.params;
    
    // Get batch ID
    const batchRecord = await prisma.batch.findFirst({
      where: { batchCode: batch }
    });

    if (!batchRecord) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Get teams for this event and batch
    const teams = await prisma.team.findMany({
      where: {
        eventId: parseInt(eventId),
        batchId: batchRecord.id
      },
      include: {
        members: {
          include: {
            participant: true
          }
        },
        captain: true
      }
    });

    // Get individual participants for this event and batch
    const participants = await prisma.participant.findMany({
      where: {
        batchId: batchRecord.id,
        eventRegistrations: {
          some: {
            eventId: parseInt(eventId),
            registrationType: 'individual'
          }
        }
      }
    });

    res.json({ teams, participants });
  } catch (error) {
    console.error('Error fetching teams and participants:', error);
    res.status(500).json({ error: 'Failed to fetch teams and participants' });
  }
});

// Get all batches for an event
router.get("/events/:eventId/batches", async (req, res) => {
  try {
    const { eventId } = req.params;

    const batches = await prisma.batch.findMany({
      where: {
        OR: [
          {
            teams: {
              some: {
                eventId: parseInt(eventId)
              }
            }
          },
          {
            participants: {
              some: {
                eventRegistrations: {
                  some: {
                    eventId: parseInt(eventId)
                  }
                }
              }
            }
          }
        ]
      },
      orderBy: { batchCode: 'asc' }
    });

    res.json(batches.map(b => b.batchCode));
  } catch (error) {
    console.error('Error fetching batches:', error);
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
});

// Get teams by batch (all events)
router.get("/batches/:batch/teams", async (req, res) => {
  try {
    const { batch } = req.params;

    const batchRecord = await prisma.batch.findFirst({
      where: { batchCode: batch }
    });

    if (!batchRecord) {
      return res.status(404).json({ message: "Batch not found" });
    }

    const teams = await prisma.team.findMany({
      where: { batchId: batchRecord.id },
      include: {
        members: {
          include: {
            participant: true
          }
        },
        captain: true,
        event: true
      }
    });

    const participants = await prisma.participant.findMany({
      where: { batchId: batchRecord.id },
      include: {
        eventRegistrations: {
          include: {
            event: true
          }
        }
      }
    });

    res.json({ teams, participants });
  } catch (error) {
    console.error('Error fetching batch teams:', error);
    res.status(500).json({ error: 'Failed to fetch batch teams' });
  }
});

// Complete event with winners
router.post("/events/:eventId/complete", async (req, res) => {
  try {
    const { eventId } = req.params;
    const { winners } = req.body;

    // Create event results for winners
    for (const [position, winner] of Object.entries(winners)) {
      if (winner.team) {
        await prisma.eventResult.create({
          data: {
            eventId: parseInt(eventId),
            batchId: 1, // Should be dynamic based on winner
            teamId: winner.teamId,
            position: parseInt(position),
            pointsEarned: winner.points || 0
          }
        });
      } else if (winner.name) {
        await prisma.eventResult.create({
          data: {
            eventId: parseInt(eventId),
            batchId: 1, // Should be dynamic based on winner
            participantId: winner.participantId,
            position: parseInt(position),
            pointsEarned: winner.points || 0
          }
        });
      }
    }

    // Update event status
    await prisma.event.update({
      where: { id: parseInt(eventId) },
      data: { status: 'completed' }
    });

    res.json({
      success: true,
      message: `Event ${eventId} completed successfully`,
      leaderboardUpdated: true
    });
  } catch (error) {
    console.error('Error completing event:', error);
    res.status(500).json({ error: 'Failed to complete event' });
  }
});

module.exports = router; 