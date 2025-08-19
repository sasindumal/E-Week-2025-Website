const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const JWT_SECRET = process.env.JWT_SECRET || 'eweek-2025-secret-key';

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: 'Access token required',
      message: 'Please provide a valid authentication token'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verify admin user still exists and is active
    const adminUser = await prisma.adminUser.findUnique({
      where: { id: decoded.userId }
    });

    if (!adminUser || !adminUser.isActive) {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'User account is inactive or not found'
      });
    }

    req.user = {
      id: adminUser.id,
      username: adminUser.username,
      email: adminUser.email,
      role: adminUser.role
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired',
        message: 'Your session has expired. Please login again.'
      });
    }
    
    return res.status(403).json({ 
      error: 'Invalid token',
      message: 'Invalid authentication token'
    });
  }
};

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      error: 'Insufficient permissions',
      message: 'Admin role required for this action'
    });
  }
  next();
};

// Middleware to check moderator role
const requireModerator = (req, res, next) => {
  if (!['admin', 'moderator'].includes(req.user.role)) {
    return res.status(403).json({ 
      error: 'Insufficient permissions',
      message: 'Moderator or admin role required for this action'
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireModerator,
  JWT_SECRET
}; 