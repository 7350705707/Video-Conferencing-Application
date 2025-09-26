# Zoom Clone - Video Conferencing Application

A full-stack real-time video conferencing application built with React, Node.js, Socket.IO, and WebRTC. Features include video calls, screen sharing, real-time chat, user authentication, and meeting history tracking.

## 🎯 Project Overview

This application replicates the core functionality of popular video conferencing platforms like Zoom, providing users with the ability to:
- Join video meetings with real-time audio/video
- Share screens during calls
- Chat with other participants
- Track meeting history
- Secure user authentication

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React 19.1.0 with Vite 7.0.0
- **UI Library**: Material-UI (MUI) for modern components
- **Real-time Communication**: Socket.IO Client for WebRTC signaling
- **Routing**: React Router DOM for navigation
- **Authentication**: Context API for global state management

### Backend (Node.js + Express)
- **Runtime**: Node.js with Express.js 5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.IO for bidirectional communication
- **Authentication**: JWT tokens with bcrypt password hashing
- **CORS**: Cross-origin resource sharing enabled

### Communication Flow
```
Frontend (React) ↔ Socket.IO ↔ Backend (Node.js) ↔ MongoDB
       ↓
   WebRTC P2P Video/Audio Streams
```

## 📁 Project Structure

```
zoom-clone/
├── frontend/                    # React Frontend Application
│   ├── public/                  # Static assets
│   │   ├── background.jpg
│   │   ├── MobileImage.png
│   │   └── undraw_calling_ieh0.svg
│   ├── src/
│   │   ├── contexts/            # React Context for auth
│   │   ├── pages/               # Application pages
│   │   ├── styles/              # CSS Modules
│   │   ├── utils/               # Utility functions
│   │   └── App.jsx              # Main app component
│   ├── .env                     # Frontend environment variables
│   └── package.json
├── backend/                     # Node.js Backend Server
│   ├── src/
│   │   ├── controllers/         # Route handlers
│   │   ├── models/              # MongoDB schemas
│   │   ├── routes/              # API endpoints
│   │   └── app.js               # Server entry point
│   ├── .env                     # Backend environment variables
│   └── package.json
└── README.md                    # Project documentation
```

## 🚀 Features

### Core Functionality
- ✅ **Real-time Video Calls**: WebRTC-based peer-to-peer video communication
- ✅ **Screen Sharing**: Share your screen during video calls
- ✅ **Audio/Video Controls**: Toggle camera and microphone on/off
- ✅ **Real-time Chat**: Send messages during video calls
- ✅ **User Authentication**: Secure login and registration system
- ✅ **Meeting History**: Track past video calls and activities
- ✅ **Responsive Design**: Works on desktop and mobile devices

### Technical Features
- ✅ **WebRTC Integration**: Direct peer-to-peer connections for low-latency video
- ✅ **Socket.IO**: Real-time bidirectional event-based communication
- ✅ **JWT Authentication**: Secure token-based user authentication
- ✅ **Password Hashing**: bcrypt for secure password storage
- ✅ **MongoDB Integration**: User data and meeting history storage
- ✅ **Material-UI**: Modern, accessible UI components
- ✅ **CSS Modules**: Scoped styling for components

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with concurrent features
- **Vite 7.0.0** - Fast build tool and development server
- **Material-UI (MUI)** - React components implementing Google's Material Design
- **Socket.IO Client 4.8.1** - Real-time bidirectional communication
- **React Router DOM 7.6.3** - Declarative routing for React
- **Axios 1.10.0** - Promise-based HTTP client

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **Socket.IO 4.8.1** - Real-time bidirectional communication
- **MongoDB 8.16.0** - NoSQL database for user data and meetings
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT 9.0.2** - JSON Web Token authentication
- **bcrypt 6.0.0** - Password hashing

### Development Tools
- **ESLint** - Code linting and formatting
- **Nodemon** - Automatic server restart during development
- **PM2** - Production process manager
- **Vite Plugin React** - Fast React development with HMR

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB Atlas** account or local MongoDB instance
- **npm** or **yarn** package manager
- **Git** for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/7350705707/indian-video-chat.git
   cd zoom-clone
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create .env file with your MongoDB URI
   cp .env.example .env  # Edit .env with your credentials
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   # Create .env file if needed
   cp .env.example .env  # Edit if you have custom backend URL
   npm run dev
   ```

4. **Access the Application**
   - Frontend: `http://localhost:5173` (Vite default)
   - Backend: `http://localhost:8000`

### Environment Configuration

#### Backend (.env)
```env
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
PORT=8000
JWT_SECRET=your_jwt_secret_key_here
```

#### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:8000/api/v1
```

## 📱 Usage Guide

### Application Flow
1. **Landing Page** (`/`) - Welcome page with app introduction
2. **Authentication** (`/auth`) - Login or register new account
3. **Home/Dashboard** (`/home`) - Create or join video meetings
4. **Video Meeting** (`/:url`) - Main video calling interface
5. **History** (`/history`) - View past meetings and recordings

### Video Meeting Features
- **Join Meeting**: Enter username and click "Connect"
- **Camera Control**: Toggle video on/off with camera icon
- **Microphone Control**: Toggle audio on/off with mic icon
- **Screen Sharing**: Share your screen with other participants
- **Chat**: Send real-time messages during the call
- **Leave Meeting**: End the call and return to home

### API Endpoints

#### Authentication
- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - User login
- `GET /api/v1/users/get_all_activity` - Get user meeting history
- `POST /api/v1/users/add_to_activity` - Add meeting to history

#### Socket.IO Events
- `join-call` - Join a video meeting room
- `user-joined` - New user joined notification
- `user-left` - User left notification
- `signal` - WebRTC signaling (offers/answers/ICE candidates)
- `chat-message` - Send/receive chat messages

## 🔐 Security Features

### Authentication & Authorization
- **JWT Token Authentication**: Secure session management
- **Password Hashing**: bcrypt with salt rounds
- **Protected Routes**: Authentication required for sensitive operations
- **Token Validation**: Automatic token verification

### Data Protection
- **Input Validation**: Sanitization of all user inputs
- **CORS Configuration**: Controlled cross-origin access
- **Error Handling**: Secure error responses without data leakage
- **Session Management**: Automatic cleanup of expired sessions

## 🌐 WebRTC Implementation

### Signaling Flow
1. **Client A** joins room → Server broadcasts `user-joined`
2. **Client B** receives notification → Creates RTCPeerConnection
3. **Client B** creates offer → Sends via Socket.IO `signal` event
4. **Client A** receives offer → Creates answer → Sends via `signal`
5. **ICE candidates** exchanged via `signal` events
6. **Peer connection established** → Video streaming begins

### Connection Management
- **STUN Server**: `stun:stun.l.google.com:19302` for NAT traversal
- **Room-based**: Users grouped by meeting URLs
- **Participant Tracking**: Real-time user presence monitoring
- **Connection Cleanup**: Automatic cleanup on disconnect

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  username: String (unique),
  password: String (hashed),
  token: String (session),
  createdAt: Date,
  updatedAt: Date
}
```

### Meeting Model
```javascript
{
  user_id: String,
  meetingCode: String (unique),
  date: Date
}
```

## 🚀 Deployment

### Development
```bash
# Backend
cd backend && npm run dev

# Frontend (new terminal)
cd frontend && npm run dev
```

### Production
```bash
# Backend
cd backend && npm run prod

# Frontend
cd frontend && npm run build && npm run preview
```

### Environment Setup for Production
- Set `NODE_ENV=production`
- Configure production MongoDB URI
- Set up HTTPS certificates (required for WebRTC)
- Configure production domain in CORS settings

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues
1. **MongoDB Connection Failed**
   - Verify MongoDB URI format
   - Check IP whitelist in MongoDB Atlas
   - Ensure username/password are correct

2. **Port Already in Use**
   ```bash
   # Find process using port 8000
   netstat -ano | findstr :8000
   # Kill the process or change port in .env
   ```

#### Frontend Issues
1. **WebSocket Connection Failed**
   - Ensure backend server is running on port 8000
   - Check firewall settings
   - Verify network connectivity

2. **Camera/Microphone Not Working**
   - Grant browser permissions for camera and microphone
   - Check if other applications are using the devices
   - Try refreshing the page

3. **Video Not Loading**
   - Check browser compatibility (Chrome, Firefox, Safari, Edge)
   - Ensure HTTPS in production (WebRTC requirement)
   - Verify WebRTC support

### Debug Commands
```bash
# Socket.IO debug logging
DEBUG=socket.io:* npm run dev

# Check MongoDB connection
mongosh "mongodb+srv://username:password@cluster.mongodb.net/database"
```

## 📱 Browser Compatibility

### Supported Browsers
- ✅ **Chrome** (recommended) - Full WebRTC support
- ✅ **Firefox** - Full WebRTC support
- ✅ **Safari** - Full WebRTC support
- ✅ **Edge** - Full WebRTC support
- ❌ **Internet Explorer** - Not supported

### Mobile Support
- ✅ **Android Chrome** - Full functionality
- ✅ **iOS Safari** - Full functionality
- ⚠️ **Other mobile browsers** - Limited WebRTC support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Use meaningful commit messages
- Test both frontend and backend changes
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **WebRTC** for enabling peer-to-peer video communication
- **Socket.IO** for real-time bidirectional communication
- **Material-UI** for beautiful and accessible UI components
- **MongoDB** for flexible and scalable data storage
- **React Community** for the amazing frontend framework
- **Node.js Community** for the robust backend runtime

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the detailed README files in `frontend/` and `backend/` directories

---

**Happy Video Conferencing! 🎥**