# Zoom Clone - Frontend

A modern video conferencing application built with React, Vite, and Socket.IO, featuring real-time video calls, screen sharing, and chat functionality.

## 🚀 Features

### Core Functionality
- **Real-time Video Calls**: WebRTC-based peer-to-peer video communication
- **Screen Sharing**: Share your screen during video calls
- **Audio/Video Controls**: Toggle camera and microphone on/off
- **Real-time Chat**: Send messages during video calls
- **User Authentication**: Secure login and registration system
- **Meeting History**: Track past video calls and meetings
- **Responsive Design**: Works on desktop and mobile devices

### Technical Features
- **WebRTC Integration**: Direct peer-to-peer connections for low-latency video
- **Socket.IO**: Real-time bidirectional communication
- **Material-UI**: Modern, accessible UI components
- **React Router**: Client-side routing for navigation
- **Context API**: Global state management for authentication
- **CSS Modules**: Scoped styling for components

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.0** - Modern React with concurrent features
- **Vite 7.0.0** - Fast build tool and development server
- **React Router DOM 7.6.3** - Declarative routing for React

### UI & Styling
- **Material-UI (MUI)** - React components implementing Google's Material Design
- **CSS Modules** - Scoped and modular CSS
- **FontAwesome Icons** - Rich icon library

### Real-time Communication
- **Socket.IO Client 4.8.1** - Real-time bidirectional event-based communication
- **WebRTC** - Real-time communication between browsers

### HTTP Client & Utilities
- **Axios 1.10.0** - Promise-based HTTP client
- **React Context API** - State management for authentication

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite Plugin React** - Fast React development with HMR

## 📁 Project Structure

```
frontend/
├── public/
│   ├── background.jpg
│   ├── MobileImage.png
│   └── undraw_calling_ieh0.svg
├── src/
│   ├── assets/                 # Static assets
│   ├── contexts/
│   │   └── AuthContext.jsx     # Authentication context provider
│   ├── pages/
│   │   ├── Authentication.jsx  # Login/Register page
│   │   ├── History.jsx         # Meeting history page
│   │   ├── Home.jsx            # Dashboard/Home page
│   │   ├── LandingPage.jsx     # Landing page
│   │   └── VideoMeet.jsx       # Main video calling component
│   ├── styles/
│   │   ├── Home.module.css
│   │   └── VideoMeetComponent.module.css
│   ├── utils/
│   │   └── withAuth.jsx        # Authentication HOC
│   ├── App.jsx                 # Main app component with routing
│   ├── App.css                 # Global styles
│   ├── index.css               # Base styles
│   └── main.jsx                # App entry point
├── .env                        # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Backend server running on `http://localhost:8000`

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zoom-clone/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_BACKEND_URL=http://localhost:8000/api/v1
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 📱 Usage

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

## 🔌 API Integration

### Environment Variables
- `VITE_BACKEND_URL`: Backend API base URL (default: `http://localhost:8000/api/v1`)

### Socket.IO Events
- `join-call`: Join a video meeting room
- `user-joined`: New user joined the meeting
- `user-left`: User left the meeting
- `signal`: WebRTC signaling for peer connections
- `chat-message`: Send/receive chat messages

## 🎨 Styling

The application uses CSS Modules for component-scoped styling:
- `VideoMeetComponent.module.css` - Video meeting interface styles
- `Home.module.css` - Dashboard and home page styles
- `App.css` - Global application styles
- `index.css` - Base HTML element styles

## 🔒 Authentication

Uses React Context API for global authentication state:
- `AuthContext.jsx` - Authentication context provider
- `withAuth.jsx` - Higher-order component for protected routes

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1920px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

## 🐛 Troubleshooting

### Common Issues

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
   - Ensure HTTPS in production (WebRTC requires secure context)
   - Verify WebRTC support

### Development Commands

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- Socket.IO for real-time communication
- WebRTC for peer-to-peer video communication
- React community for the amazing framework
