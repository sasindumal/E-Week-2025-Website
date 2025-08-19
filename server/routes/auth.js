const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const { authenticateToken, requireAdmin, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing credentials',
        message: 'Email and password are required'
      });
    }

    // Find admin user by email
    const adminUser = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!adminUser) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!adminUser.isActive) {
      return res.status(401).json({
        error: 'Account disabled',
        message: 'Your account has been disabled. Please contact an administrator.'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, adminUser.passwordHash);
    
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: adminUser.id,
        email: adminUser.email,
        role: adminUser.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login
    await prisma.adminUser.update({
      where: { id: adminUser.id },
      data: { lastLogin: new Date() }
    });

    // Log the login action
    await prisma.systemLog.create({
      data: {
        action: 'login',
        tableName: 'admin_users',
        recordId: adminUser.id,
        adminUserId: adminUser.id,
        details: {
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        }
      }
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: adminUser.id,
          username: adminUser.username,
          email: adminUser.email,
          role: adminUser.role
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: 'An error occurred during login. Please try again.'
    });
  }
});

// Admin Logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Log the logout action
    await prisma.systemLog.create({
      data: {
        action: 'logout',
        tableName: 'admin_users',
        recordId: req.user.id,
        adminUserId: req.user.id,
        details: {
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        }
      }
    });

    res.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Logout failed',
      message: 'An error occurred during logout.'
    });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const adminUser = await prisma.adminUser.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true
      }
    });

    if (!adminUser) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User profile not found'
      });
    }

    res.json({
      success: true,
      data: adminUser
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      error: 'Profile fetch failed',
      message: 'An error occurred while fetching profile.'
    });
  }
});

// Change password
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Missing passwords',
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: 'Weak password',
        message: 'New password must be at least 6 characters long'
      });
    }

    // Get current user with password hash
    const adminUser = await prisma.adminUser.findUnique({
      where: { id: req.user.id }
    });

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, adminUser.passwordHash);
    
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid password',
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.adminUser.update({
      where: { id: req.user.id },
      data: { passwordHash: newPasswordHash }
    });

    // Log password change
    await prisma.systemLog.create({
      data: {
        action: 'password_change',
        tableName: 'admin_users',
        recordId: req.user.id,
        adminUserId: req.user.id,
        details: {
          ipAddress: req.ip
        }
      }
    });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      error: 'Password change failed',
      message: 'An error occurred while changing password.'
    });
  }
});

// Refresh token
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    // Generate new token
    const newToken = jwt.sign(
      { 
        userId: req.user.id,
        email: req.user.email,
        role: req.user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        token: newToken
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      error: 'Token refresh failed',
      message: 'An error occurred while refreshing token.'
    });
  }
});

// Verify token (for frontend validation)
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Token is valid',
      data: {
        user: {
          id: req.user.id,
          username: req.user.username,
          email: req.user.email,
          role: req.user.role
        }
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      error: 'Token verification failed',
      message: 'An error occurred while verifying token.'
    });
  }
});

module.exports = router; 