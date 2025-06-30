# E-Week 2025 - University of Jaffna Faculty of Engineering

A modern, responsive web application for the E-Week 2025 engineering competition event.

## 🚀 Features

- **Modern React.js Frontend** with functional components and hooks
- **Express.js Backend** with RESTful API
- **Responsive Design** that works on all devices
- **Real-time Countdown Timer** to the event
- **Event Management** with category filtering
- **Photo Gallery** with year-based filtering
- **Team Leaderboard** with detailed scoring
- **Context API** for state management
- **Production Ready** with optimized builds

## 🎨 Design

- **Color Scheme**: Navy (#110921), Red (#a71c20), White (#ffffff)
- **Modern Glassmorphism** effects
- **Smooth Animations** and transitions
- **Mobile-First** responsive design
- **Accessible** UI components

## 🛠️ Tech Stack

### Frontend

- React.js 18
- React Router v6
- Context API for state management
- Axios for API calls
- Lucide React for icons
- CSS3 with custom properties

### Backend

- Node.js
- Express.js
- CORS enabled
- RESTful API architecture

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd eweek-2025
   ```

2. **Install dependencies**

   ```bash
   npm run install:all
   ```

3. **Start development servers**

   ```bash
   npm run dev
   ```

   This will start:

   - Backend server on `http://localhost:5000`
   - Frontend server on `http://localhost:3000`

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

Create `.env` file in the root directory:

```env
NODE_ENV=production
PORT=5000
```

### Hosting Options

- **Heroku**: Use the included `heroku-postbuild` script
- **Netlify**: Deploy the `client/build` folder
- **Vercel**: Deploy with the provided configuration
- **Traditional VPS**: Use PM2 or similar process manager

## 📱 Pages

1. **Home** (`/`) - Hero section with countdown and event highlights
2. **Events** (`/events`) - Event schedule with filtering and registration
3. **Gallery** (`/gallery`) - Photo gallery from previous years
4. **Scorecards** (`/scorecards`) - Team rankings and scoring details

## 🔧 API Endpoints

- `GET /api/health` - API health check
- `GET /api/events` - Get all events (with optional category filter)
- `GET /api/events/:id` - Get specific event
- `GET /api/leaderboard` - Get team rankings
- `GET /api/gallery` - Get gallery items (with optional year filter)
- `POST /api/register` - Register for an event

## 🎯 Key Components

### Frontend Components

- `Navigation` - Responsive navigation bar
- `CountdownTimer` - Real-time countdown to event
- `Layout` - Common layout wrapper
- `AppContext` - Global state management

### Backend Features

- RESTful API with proper HTTP methods
- CORS configuration for cross-origin requests
- Static file serving for production
- Error handling middleware

## 🔄 State Management

The app uses React Context API for state management:

- **AppContext** - Global app state
- **Events** - Event data and filtering
- **Gallery** - Gallery items and filtering
- **Leaderboard** - Team rankings data
- **Loading States** - UI loading indicators

## 📊 Performance

- **Lazy Loading** for images
- **Code Splitting** with React Router
- **Optimized Bundle** size
- **Responsive Images** with multiple formats
- **Caching Headers** for static assets

## 🔒 Security

- **CORS** properly configured
- **Environment Variables** for sensitive data
- **Input Validation** on API endpoints
- **XSS Protection** with proper escaping

## 📱 Mobile Experience

- **Mobile-First** design approach
- **Touch-Friendly** interactions
- **Optimized** for various screen sizes
- **Progressive Web App** features

## 🎨 Customization

### Colors

Update CSS custom properties in `client/src/index.css`:

```css
:root {
  --eweek-white: #ffffff;
  --eweek-navy: #110921;
  --eweek-red: #a71c20;
}
```

### Content

- Event data: `server/routes/api.js`
- Static content: Individual page components
- Images: Update image URLs in components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🏫 University of Jaffna

Faculty of Engineering  
E-Week 2025 Organizing Committee

---

**Live Demo**: [E-Week 2025](https://eweek2025.uoj.ac.lk)  
**Contact**: eweek2025@eng.jfn.ac.lk
