# Zoom Clone - Backend

A robust Node.js backend server for a real-time video conferencing application, built with Express.js, Socket.IO, and MongoDB. Features WebRTC signaling, user authentication, meeting history tracking, and real-time chat functionality.

## 🚀 Features

### Core Functionality
- **Real-time Video Calls**: WebRTC signaling server for peer-to-peer connections
- **User Authentication**: JWT-based authentication with secure password hashing
- **Meeting Management**: Track meeting history and activities
- **Real-time Chat**: Socket.IO powered instant messaging during calls
- **Room Management**: Dynamic room creation and participant management
- **User Presence**: Track online users and connection status

### Technical Features
- **WebRTC Signaling**: Handle offer/answer exchange for video calls
- **Socket.IO Integration**: Real-time bidirectional communication
- **MongoDB Integration**: User data and meeting history storage
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **CORS Support**: Cross-origin resource sharing configuration
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

### Runtime & Framework
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **Socket.IO 4.8.1** - Real-time bidirectional communication

### Database & Storage
- **MongoDB 8.16.0** - NoSQL database for user data and meetings
- **Mongoose** - MongoDB object modeling for Node.js

### Security & Authentication
- **bcrypt 6.0.0** - Password hashing
- **jsonwebtoken 9.0.2** - JWT token generation and verification
- **crypto** - Node.js built-in cryptographic functionality

### Development Tools
- **Nodemon 3.1.10** - Automatic server restart during development
- **PM2** - Production process manager
- **CORS 2.8.5** - Cross-origin resource sharing
- **Dotenv 16.5.0** - Environment variable management

## 📁 Project Structure

```
backend/
├── src/
│   ├── controlllers/
│   │   ├── socket.Manager.js     # Socket.IO event handlers and WebRTC signaling
│   │   └── user.controller.js    # User authentication and meeting management
│   ├── models/
│   │   ├── meeting.model.js      # Meeting history data model
│   │   └── user.model.js         # User authentication data model
│   ├── routes/
│   │   └── user.route.js         # API routes for user operations
│   └── app.js                    # Main application entry point
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zoom-clone/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   PORT=8000
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the production server**
   ```bash
   npm run prod
   ```

## 📡 API Endpoints

### Authentication Routes (`/api/v1/users`)

#### POST `/api/v1/users/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "name": "John Doe",
    "username": "johndoe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/v1/users/login`
Authenticate user and return session token.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "random_session_token"
}
```

#### POST `/api/v1/users/add_to_activity`
Add a meeting to user's activity history.

**Request Body:**
```json
{
  "user_id": "user_id",
  "meetingCode": "meeting_room_id"
}
```

#### GET `/api/v1/users/get_all_activity`
Get user's meeting history.

**Response:**
```json
[
  {
    "user_id": "user_id",
    "meetingCode": "meeting_room_id",
    "date": "2024-01-01T00:00:00.000Z"
  }
]
```

## 🔌 Socket.IO Events

### Connection Events
- **`connection`**: Client connects to server
- **`disconnect`**: Client disconnects from server

### Video Call Events
- **`join-call`**: Join a video meeting room
  - **Parameters**: `(path, username)`
  - **Emits**: `user-joined` to all room participants

- **`user-joined`**: New user joined the meeting
  - **Emits**: `(socketId, clients[], usernames{})`

- **`user-left`**: User left the meeting
  - **Emits**: `(socketId, timeOnline)`

- **`signal`**: WebRTC signaling for peer connections
  - **Parameters**: `(toId, message)`
  - **Message Types**: SDP offers/answers, ICE candidates

### Chat Events
- **`chat-message`**: Send/receive chat messages
  - **Parameters**: `(data, sender)`
  - **Emits**: `(data, sender, socketIdSender)`

## 🗄️ Database Models

### User Model
```javascript
{
  name: String (required),
  username: String (required, unique),
  password: String (required, hashed),
  token: String (session token),
  createdAt: Date,
  updatedAt: Date
}
```

### Meeting Model
```javascript
{
  user_id: String (required),
  meetingCode: String (required, unique),
  date: Date (default: now)
}
```

## 🔐 Security Features

### Password Security
- **bcrypt hashing** with salt rounds for password storage
- **Password comparison** method for secure authentication

### Authentication
- **JWT token generation** for session management
- **Token validation** for protected routes
- **Session management** with automatic token cleanup

### Data Validation
- **Input sanitization** for all user inputs
- **Required field validation** for API endpoints
- **Unique constraint** enforcement for usernames

## 🌐 WebRTC Signaling Flow

1. **Client A** joins room → Server broadcasts `user-joined`
2. **Client B** receives `user-joined` → Creates RTCPeerConnection
3. **Client B** creates offer → Sends via `signal` event
4. **Client A** receives offer → Creates answer → Sends via `signal`
5. **ICE candidates** exchanged via `signal` events
6. **Peer connection established** → Video streaming begins

## 📊 Real-time Features

### Connection Management
- **Room-based connections**: Users grouped by meeting URLs
- **Participant tracking**: Real-time user presence
- **Connection cleanup**: Automatic cleanup on disconnect

### Message Persistence
- **Chat history**: Messages stored per room
- **Message delivery**: Send missed messages to new joiners
- **User identification**: Messages tagged with sender info

### Performance Monitoring
- **Connection time tracking**: Monitor user online duration
- **Room statistics**: Track active participants per room
- **Error logging**: Comprehensive error tracking

## 🚀 Deployment

### Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production
```bash
npm run build  # If using build process
npm run prod   # Uses PM2 for production
```

### Environment Variables for Production
```env
DB_URI=mongodb+srv://prod_user:prod_pass@prod_cluster.mongodb.net/prod_db
PORT=8000
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   ```bash
   # Check MongoDB URI format
   # Ensure IP whitelist includes your server IP
   # Verify username/password credentials
   ```

2. **Socket.IO Connection Issues**
   ```bash
   # Check CORS configuration
   # Verify Socket.IO client version compatibility
   # Ensure correct server port
   ```

3. **WebRTC Signaling Problems**
   ```bash
   # Check STUN/TURN server configuration
   # Verify firewall settings for WebRTC ports
   # Ensure HTTPS in production (WebRTC requirement)
   ```

### Debug Mode
```bash
DEBUG=socket.io:* npm run dev  # Socket.IO debug logging
```

## 📈 Monitoring & Logging

### Application Logs
- **Connection events**: User join/leave tracking
- **Error handling**: Comprehensive error logging
- **Performance metrics**: Connection timing and room statistics

### Database Monitoring
- **Connection status**: MongoDB connection health
- **Query performance**: Database operation monitoring
- **Data integrity**: User and meeting data validation

## 🤝 API Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... },
  "status": 200
}
```

### Error Response
```json
{
  "error": "Error description",
  "status": 400
}
```

## 🔄 Development Workflow

1. **Development**: `npm run dev` with nodemon auto-restart
2. **Testing**: Manual testing with frontend client
3. **Database**: MongoDB Atlas for cloud database
4. **Deployment**: PM2 for production process management

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- **Socket.IO** for real-time communication
- **WebRTC** for peer-to-peer video communication
- **MongoDB** for flexible data storage
- **Express.js** for robust API framework
- **JWT** for secure authentication