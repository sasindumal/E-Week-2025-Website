# Authentication System for E-Week 2025

This document describes the authentication system implemented for the E-Week 2025 admin panel.

## 🔐 Overview

The authentication system provides secure access to the admin panel with the following features:

- **JWT-based authentication** with 24-hour token expiration
- **Role-based access control** (Admin, Moderator)
- **Password hashing** using bcrypt
- **Audit logging** for all authentication actions
- **Token refresh** functionality
- **Account status management**

## 🏗️ Architecture

### Components

1. **Authentication Middleware** (`middleware/auth.js`)
   - JWT token verification
   - Role-based access control
   - User session validation

2. **Authentication Routes** (`routes/auth.js`)
   - Login/logout endpoints
   - Password management
   - Token refresh
   - Profile management

3. **Admin API Routes** (`routes/admin-api.js`)
   - Protected admin endpoints
   - Role-based permissions
   - Audit logging

## 🔑 Authentication Flow

### 1. Login Process

```javascript
POST /api/auth/login
{
  "email": "admin@eweek.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@eweek.com",
      "role": "admin"
    }
  }
}
```

### 2. Token Usage

Include the JWT token in the Authorization header:

```javascript
Authorization: Bearer <token>
```

### 3. Role-Based Access

- **Admin**: Full access to all features
- **Moderator**: Read access + limited write access
- **Viewer**: Read-only access (future implementation)

## 📋 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Admin login | No |
| POST | `/api/auth/logout` | Admin logout | Yes |
| GET | `/api/auth/profile` | Get user profile | Yes |
| POST | `/api/auth/change-password` | Change password | Yes |
| POST | `/api/auth/refresh` | Refresh token | Yes |
| GET | `/api/auth/verify` | Verify token | Yes |

### Admin Endpoints

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/dashboard/stats` | Dashboard statistics | Moderator+ |
| GET | `/api/admin/dashboard/activity` | Recent activity | Moderator+ |
| GET | `/api/admin/events` | Get all events | Moderator+ |
| POST | `/api/admin/events` | Create event | Admin |
| PUT | `/api/admin/events/:id` | Update event | Admin |
| DELETE | `/api/admin/events/:id` | Delete event | Admin |
| GET | `/api/admin/participants` | Get participants | Moderator+ |
| POST | `/api/admin/participants` | Create participant | Admin |
| PUT | `/api/admin/participants/:id` | Update participant | Admin |
| DELETE | `/api/admin/participants/:id` | Delete participant | Admin |
| GET | `/api/admin/teams` | Get teams | Moderator+ |
| GET | `/api/admin/gallery` | Get gallery | Moderator+ |
| PUT | `/api/admin/gallery/:id/status` | Update gallery status | Moderator+ |
| DELETE | `/api/admin/gallery/:id` | Delete gallery item | Admin |
| GET | `/api/admin/system-logs` | Get system logs | Admin |
| GET | `/api/admin/admin-users` | Get admin users | Admin |
| POST | `/api/admin/admin-users` | Create admin user | Admin |

## 🔒 Security Features

### Password Security
- **bcrypt hashing** with 12 salt rounds
- **Minimum 6 characters** required
- **Password change** functionality with current password verification

### Token Security
- **JWT tokens** with 24-hour expiration
- **Automatic token refresh** capability
- **Token verification** on each request
- **Account status validation** (active/inactive)

### Audit Logging
All authentication and admin actions are logged:

```javascript
// Example log entry
{
  "action": "login",
  "tableName": "admin_users",
  "recordId": 1,
  "adminUserId": 1,
  "details": {
    "ipAddress": "127.0.0.1",
    "userAgent": "Mozilla/5.0..."
  },
  "createdAt": "2025-08-04T20:13:20.914Z"
}
```

### Error Handling
- **401 Unauthorized**: Invalid/missing token
- **403 Forbidden**: Insufficient permissions
- **400 Bad Request**: Invalid input data
- **500 Internal Server Error**: Server errors

## 👤 User Management

### Default Admin Account
- **Email**: admin@eweek.com
- **Password**: admin123
- **Role**: admin
- **Status**: active

### Creating New Admin Users
```javascript
POST /api/admin/admin-users
{
  "username": "moderator1",
  "email": "moderator@eweek.com",
  "password": "securepassword",
  "role": "moderator"
}
```

### Role Permissions

#### Admin Role
- ✅ Full access to all features
- ✅ Create/update/delete events
- ✅ Manage participants
- ✅ Manage gallery
- ✅ View system logs
- ✅ Manage admin users
- ✅ Access dashboard statistics

#### Moderator Role
- ✅ View all data
- ✅ Update gallery status
- ✅ View dashboard statistics
- ✅ View recent activity
- ❌ Cannot delete records
- ❌ Cannot manage admin users

## 🧪 Testing

### Manual Testing
```bash
# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eweek.com","password":"admin123"}'

# Test protected endpoint
curl -X GET http://localhost:3001/api/admin/dashboard/stats \
  -H "Authorization: Bearer <token>"
```

### Automated Testing
The authentication system includes comprehensive test coverage for:
- Login with valid/invalid credentials
- Token verification
- Role-based access control
- Password change functionality
- Logout process

## 🚀 Frontend Integration

### Login Component
```javascript
const handleLogin = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', {
      email,
      password
    });
    
    // Store token
    localStorage.setItem('adminToken', response.data.data.token);
    
    // Navigate to admin panel
    navigate('/admin');
  } catch (error) {
    // Handle error
  }
};
```

### Protected Route Component
```javascript
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  
  return children;
};
```

### API Interceptor
```javascript
// Add token to all requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);
```

## 🔧 Configuration

### Environment Variables
```env
JWT_SECRET="eweek-2025-super-secret-jwt-key-change-in-production"
DATABASE_URL="mysql://root:12345678@localhost:3306/eweek_2025"
NODE_ENV=development
PORT=3001
```

### Database Schema
The authentication system uses the following database tables:
- `admin_users`: User accounts and roles
- `system_logs`: Audit trail for all actions

## 🚨 Security Best Practices

1. **Change default credentials** in production
2. **Use strong JWT secret** in production
3. **Enable HTTPS** in production
4. **Implement rate limiting** for login attempts
5. **Regular password rotation** for admin accounts
6. **Monitor system logs** for suspicious activity
7. **Implement session timeout** for inactive users

## 📚 Additional Resources

- [JWT Documentation](https://jwt.io/)
- [bcrypt Documentation](https://github.com/dcodeIO/bcrypt.js)
- [Prisma Documentation](https://www.prisma.io/docs/)

---

**Authentication System Version**: 1.0.0  
**Last Updated**: August 2025  
**Maintainer**: E-Week 2025 Development Team 