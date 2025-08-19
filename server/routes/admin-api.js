const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { authenticateToken, requireAdmin, requireModerator } = require('../middleware/auth');

// Apply authentication middleware to all admin routes
router.use(authenticateToken);

// ==================== EVENTS MANAGEMENT ====================

// Get all events (admin view)
router.get('/events', requireModerator, async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    });

    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create new event
router.post('/events', requireAdmin, async (req, res) => {
  try {
    const eventData = req.body;
    const event = await prisma.event.create({
      data: {
        title: eventData.title,
        description: eventData.description,
        date: new Date(eventData.date),
        timeStart: new Date(`1970-01-01T${eventData.timeStart}`),
        timeEnd: new Date(`1970-01-01T${eventData.timeEnd}`),
        location: eventData.location,
        category: eventData.category,
        maxParticipants: eventData.maxParticipants,
        minTeamSize: eventData.minTeamSize || 1,
        maxTeamSize: eventData.maxTeamSize || 1,
        isTeamEvent: eventData.isTeamEvent || false,
        status: eventData.status || 'upcoming'
      }
    });

    // Log the action
    await prisma.systemLog.create({
      data: {
        action: 'create_event',
        tableName: 'events',
        recordId: event.id,
        adminUserId: req.user.id,
        details: { eventData }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update event
router.put('/events/:id', requireAdmin, async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const eventData = req.body;
    
    const event = await prisma.event.update({
      where: { id: eventId },
      data: {
        title: eventData.title,
        description: eventData.description,
        date: new Date(eventData.date),
        timeStart: new Date(`1970-01-01T${eventData.timeStart}`),
        timeEnd: new Date(`1970-01-01T${eventData.timeEnd}`),
        location: eventData.location,
        category: eventData.category,
        maxParticipants: eventData.maxParticipants,
        minTeamSize: eventData.minTeamSize,
        maxTeamSize: eventData.maxTeamSize,
        isTeamEvent: eventData.isTeamEvent,
        status: eventData.status
      }
    });

    // Log the action
    await prisma.systemLog.create({
      data: {
        action: 'update_event',
        tableName: 'events',
        recordId: eventId,
        adminUserId: req.user.id,
        details: { eventData }
      }
    });

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete event
router.delete('/events/:id', requireAdmin, async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    
    await prisma.event.delete({
      where: { id: eventId }
    });

    // Log the action
    await prisma.systemLog.create({
      data: {
        action: 'delete_event',
        tableName: 'events',
        recordId: eventId,
        adminUserId: req.user.id
      }
    });

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// ==================== PARTICIPANTS MANAGEMENT ====================

// Get all participants
router.get('/participants', requireModerator, async (req, res) => {
  try {
    const participants = await prisma.participant.findMany({
      include: {
        batch: true
      },
      orderBy: { name: 'asc' }
    });

    res.json({
      success: true,
      data: participants
    });
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({ error: 'Failed to fetch participants' });
  }
});

// Create participant
router.post('/participants', requireAdmin, async (req, res) => {
  try {
    const participantData = req.body;
    const participant = await prisma.participant.create({
      data: {
        studentId: participantData.studentId,
        name: participantData.name,
        email: participantData.email,
        batchId: participantData.batchId,
        phone: participantData.phone,
        department: participantData.department
      },
      include: {
        batch: true
      }
    });

    // Log the action
    await prisma.systemLog.create({
      data: {
        action: 'create_participant',
        tableName: 'participants',
        recordId: participant.id,
        adminUserId: req.user.id,
        details: { participantData }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Participant created successfully',
      data: participant
    });
  } catch (error) {
    console.error('Error creating participant:', error);
    res.status(500).json({ error: 'Failed to create participant' });
  }
});

// Update participant
router.put('/participants/:id', requireAdmin, async (req, res) => {
  try {
    const participantId = parseInt(req.params.id);
    const participantData = req.body;
    
    const participant = await prisma.participant.update({
      where: { id: participantId },
      data: {
        studentId: participantData.studentId,
        name: participantData.name,
        email: participantData.email,
        batchId: participantData.batchId,
        phone: participantData.phone,
        department: participantData.department,
        isActive: participantData.isActive
      },
      include: {
        batch: true
      }
    });

    // Log the action
    await prisma.systemLog.create({
      data: {
        action: 'update_participant',
        tableName: 'participants',
        recordId: participantId,
        adminUserId: req.user.id,
        details: { participantData }
      }
    });

    res.json({
      success: true,
      message: 'Participant updated successfully',
      data: participant
    });
  } catch (error) {
    console.error('Error updating participant:', error);
    res.status(500).json({ error: 'Failed to update participant' });
  }
});

// Delete participant
router.delete('/participants/:id', requireAdmin, async (req, res) => {
  try {
    const participantId = parseInt(req.params.id);
    
    await prisma.participant.delete({
      where: { id: participantId }
    });

    // Log the action
    await prisma.systemLog.create({
      data: {
        action: 'delete_participant',
        tableName: 'participants',
        recordId: participantId,
        adminUserId: req.user.id
      }
    });

    res.json({
      success: true,
      message: 'Participant deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting participant:', error);
    res.status(500).json({ error: 'Failed to delete participant' });
  }
});

// ==================== TEAMS MANAGEMENT ====================

// Get all teams
router.get('/teams', requireModerator, async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        batch: true,
        event: true,
        captain: true,
        members: {
          include: {
            participant: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json({
      success: true,
      data: teams
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// Get teams by event
router.get('/events/:eventId/teams', requireModerator, async (req, res) => {
  try {
    const eventId = parseInt(req.params.eventId);
    const teams = await prisma.team.findMany({
      where: { eventId },
      include: {
        batch: true,
        captain: true,
        members: {
          include: {
            participant: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: teams
    });
  } catch (error) {
    console.error('Error fetching teams by event:', error);
    res.status(500).json({ error: 'Failed to fetch teams by event' });
  }
});

// ==================== EVENT REGISTRATIONS ====================

// Get event registrations
router.get('/event-registrations', requireModerator, async (req, res) => {
  try {
    const { eventId } = req.query;
    let whereClause = {};
    
    if (eventId) {
      whereClause.eventId = parseInt(eventId);
    }

    const registrations = await prisma.eventRegistration.findMany({
      where: whereClause,
      include: {
        event: true,
        participant: {
          include: {
            batch: true
          }
        },
        team: {
          include: {
            members: {
              include: {
                participant: true
              }
            }
          }
        }
      },
      orderBy: { registeredAt: 'desc' }
    });

    res.json({
      success: true,
      data: registrations
    });
  } catch (error) {
    console.error('Error fetching event registrations:', error);
    res.status(500).json({ error: 'Failed to fetch event registrations' });
  }
});

// ==================== GALLERY MANAGEMENT ====================

// Get gallery items
router.get('/gallery', requireModerator, async (req, res) => {
  try {
    const galleryItems = await prisma.gallery.findMany({
      include: {
        event: true,
        uploader: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: galleryItems
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// Update gallery item status
router.put('/gallery/:id/status', requireModerator, async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const { status } = req.body;

    const item = await prisma.gallery.update({
      where: { id: itemId },
      data: { status }
    });

    // Log the action
    await prisma.systemLog.create({
      data: {
        action: 'update_gallery_status',
        tableName: 'gallery',
        recordId: itemId,
        adminUserId: req.user.id,
        details: { status }
      }
    });

    res.json({
      success: true,
      message: 'Gallery item status updated successfully',
      data: item
    });
  } catch (error) {
    console.error('Error updating gallery status:', error);
    res.status(500).json({ error: 'Failed to update gallery status' });
  }
});

// Delete gallery item
router.delete('/gallery/:id', requireAdmin, async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    
    await prisma.gallery.delete({
      where: { id: itemId }
    });

    // Log the action
    await prisma.systemLog.create({
      data: {
        action: 'delete_gallery_item',
        tableName: 'gallery',
        recordId: itemId,
        adminUserId: req.user.id
      }
    });

    res.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

// ==================== EVENT HISTORY ====================

// Get event history
router.get('/event-history', requireModerator, async (req, res) => {
  try {
    const history = await prisma.eventHistory.findMany({
      orderBy: { year: 'desc' }
    });

    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error('Error fetching event history:', error);
    res.status(500).json({ error: 'Failed to fetch event history' });
  }
});

// Create event history
router.post('/event-history', requireAdmin, async (req, res) => {
  try {
    const historyData = req.body;
    const history = await prisma.eventHistory.create({
      data: {
        year: historyData.year,
        eventTitle: historyData.eventTitle,
        description: historyData.description,
        highlights: historyData.highlights,
        winnerName: historyData.winnerName,
        winnerBatch: historyData.winnerBatch,
        totalParticipants: historyData.totalParticipants,
        totalTeams: historyData.totalTeams
      }
    });

    // Log the action
    await prisma.systemLog.create({
      data: {
        action: 'create_event_history',
        tableName: 'event_history',
        recordId: history.id,
        adminUserId: req.user.id,
        details: { historyData }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Event history created successfully',
      data: history
    });
  } catch (error) {
    console.error('Error creating event history:', error);
    res.status(500).json({ error: 'Failed to create event history' });
  }
});

// ==================== SYSTEM LOGS ====================

// Get system logs
router.get('/system-logs', requireAdmin, async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    const logs = await prisma.systemLog.findMany({
      include: {
        adminUser: true
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit)
    });

    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    console.error('Error fetching system logs:', error);
    res.status(500).json({ error: 'Failed to fetch system logs' });
  }
});

// ==================== ADMIN USERS MANAGEMENT ====================

// Get all admin users
router.get('/admin-users', requireAdmin, async (req, res) => {
  try {
    const adminUsers = await prisma.adminUser.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: adminUsers
    });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    res.status(500).json({ error: 'Failed to fetch admin users' });
  }
});

// Create admin user
router.post('/admin-users', requireAdmin, async (req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const adminData = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 12);
    
    const adminUser = await prisma.adminUser.create({
      data: {
        username: adminData.username,
        email: adminData.email,
        passwordHash: hashedPassword,
        role: adminData.role || 'moderator',
        isActive: true
      }
    });

    // Log the action
    await prisma.systemLog.create({
      data: {
        action: 'create_admin_user',
        tableName: 'admin_users',
        recordId: adminUser.id,
        adminUserId: req.user.id,
        details: { adminData: { ...adminData, password: '[HIDDEN]' } }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        id: adminUser.id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
        isActive: adminUser.isActive
      }
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ error: 'Failed to create admin user' });
  }
});

// Update admin user status
router.put('/admin-users/:id/status', requireAdmin, async (req, res) => {
  try {
    const adminId = parseInt(req.params.id);
    const { isActive } = req.body;

    const adminUser = await prisma.adminUser.update({
      where: { id: adminId },
      data: { isActive }
    });

    // Log the action
    await prisma.systemLog.create({
      data: {
        action: 'update_admin_status',
        tableName: 'admin_users',
        recordId: adminId,
        adminUserId: req.user.id,
        details: { isActive }
      }
    });

    res.json({
      success: true,
      message: 'Admin user status updated successfully',
      data: adminUser
    });
  } catch (error) {
    console.error('Error updating admin status:', error);
    res.status(500).json({ error: 'Failed to update admin status' });
  }
});

// ==================== DASHBOARD STATISTICS ====================

// Get dashboard statistics
router.get('/dashboard/stats', requireModerator, async (req, res) => {
  try {
    const [
      totalEvents,
      activeEvents,
      totalParticipants,
      totalTeams,
      galleryImages,
      pendingApprovals
    ] = await Promise.all([
      prisma.event.count(),
      prisma.event.count({ where: { status: 'upcoming' } }),
      prisma.participant.count({ where: { isActive: true } }),
      prisma.team.count(),
      prisma.gallery.count(),
      prisma.gallery.count({ where: { status: 'pending' } })
    ]);

    res.json({
      success: true,
      data: {
        totalEvents,
        activeEvents,
        totalParticipants,
        totalTeams,
        galleryImages,
        pendingApprovals,
        monthlyGrowth: 23.5, // Mock data
        systemHealth: 98.7 // Mock data
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
});

// Get recent activity
router.get('/dashboard/activity', requireModerator, async (req, res) => {
  try {
    const recentLogs = await prisma.systemLog.findMany({
      include: {
        adminUser: true
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const activity = recentLogs.map(log => ({
      id: log.id,
      action: log.action,
      item: log.tableName,
      time: log.createdAt,
      user: log.adminUser?.username || 'System',
      type: log.action.includes('create') ? 'success' : 
            log.action.includes('delete') ? 'warning' : 'info'
    }));

    res.json({
      success: true,
      data: activity
    });
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ error: 'Failed to fetch recent activity' });
  }
});

module.exports = router; 