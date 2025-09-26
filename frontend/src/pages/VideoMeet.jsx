import React, { use, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
import style from "../styles/VideoMeetComponent.module.css";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicOnIcon from "@mui/icons-material/Mic";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import ScreenShareOffIcon from "@mui/icons-material/ScreenShare";
import Badge from "@mui/material/Badge";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";

const server_url = "http://localhost:8000";

var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};



const VideoMeet = () => {
  var socketRef = useRef();

  let navigate = useNavigate();

  // useEffect(() => {
  //   // Initialize socket in useEffect to ensure it happens after component mounts
  //   socketRef.current = io(server_url);

  //   return () => {
  //     // Clean up the socket connection when component unmounts
  //     if (socketRef.current) {
  //       socketRef.current.disconnect();
  //     }
  //   };
  // }, []);

  let socketIdRef = useRef();

  let localVideoRef = useRef();

  let [videoAvailable, setVideoAvailable] = React.useState(true);
  let [audioAvailable, setAudioAvailable] = React.useState(true);

  let [video, setVideo] = React.useState(true);
  let [audio, setAudio] = React.useState(true);

  let [screen, setScreen] = React.useState();

  let [showModal, setShowModal] = React.useState(false);

  let [screenAvailable, setScreenAvailable] = React.useState();

  let [messages, setMessages] = React.useState([]);
  let [message, setMessage] = React.useState("");

  let [newMessages, setNewMessages] = React.useState(0);

  let [askForUsername, setAskForUsername] = React.useState(true);

  let [username, setUsername] = React.useState("");

  const videoRef = useRef([]);

  let [videos, setVideos] = React.useState([]);
  let [usernames, setUsernames] = React.useState({});

  // if(isChrome() === false){

  // }

  let handleVideo = () => {
    setVideo(!video);
  };

  let handleAudio = () => {
    setAudio(!audio);
  };

  let handleScreen = () => {
    setScreen(!screen);
    setVideo(!video);
  };

  let handleChat = () => {

    setShowModal(!showModal);
   
  };

  let handleEndCall = () => {
    try{
      let tracks = localVideoRef.current.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    } catch(e) {
      console.error("Error stopping media tracks.", e);
    }

    navigate("/home");

  };

  useEffect(() => {
    if (showModal) {
      setNewMessages(0);
    }
  }, [showModal,newMessages]);

  let sendMessage = () => {
    if (message.trim() !== "") {

      socketRef.current.emit("chat-message", message, username);
      setMessage("");
    }
  };

  let getDisplayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach(track.stop());
    } catch (e) {
      console.log(e);
    }
    window.localStream = stream;
    localVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);

      connections[id]
        .createOffer()
        .then((description) => {
          connections[id]
            .setLocalDescription(description)
            .then(() => {
              socketRef.current.emit(
                "signal",
                id,
                JSON.stringify({ sdp: connections[id].localDescription })
              );
            })
            .catch((e) => {
              console.error("Error setting local description.", e);
            });
        })
        .catch((e) => {
          console.error("Error creating offer.", e);
        });
    }

    stream.getTracks().forEach((track) => {
      track.onended = () => {
        setScreen(false);
        try {
          let tracks = localVideoRef.current.srcObject.getTracks();
          tracks.forEach((track) => {
            track.stop();
          });
        } catch (e) {
          console.error("Error stopping media tracks.", e);
        }

        // TODO BlackSilence
        let BlackSilence = (...args) =>
          new MediaStream([black(...args), silence(...args)]);
        window.localStream = BlackSilence();
        localVideoRef.current.srcObject = window.localStream;

        getUserMedia();
      };
    });
  };

  let getDisplayMedia = () => {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(getDisplayMediaSuccess)
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    }
  };

  useEffect(() => {
    if (screen !== undefined) {
      getDisplayMedia();
    }
  });
  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      if (audioPermission) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable && audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });

        if (userMediaStream) {
          window.localStream = userMediaStream;

          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // console.log("Checking permissions for video and audio...");
    getPermissions();
  }, []);

  const getUserMediaSuccess = (stream) => {
    try {
      if (window.localStream !== undefined && window.localStream !== null) {
        // Stop existing tracks if any
        window.localStream.getTracks().forEach((track) => track.stop());
      }
    } catch (e) {
      console.error("Error getting user media success.", e);
    }

    window.localStream = stream;
    localVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);

      connections[id]
        .createOffer()
        .then((description) => {
          connections[id]
            .setLocalDescription(description)
            .then(() => {
              socketRef.current.emit(
                "signal",
                id,
                JSON.stringify({ sdp: connections[id].localDescription })
              );
            })
            .catch((e) => {
              console.error("Error setting local description.", e);
            });
        })
        .catch((e) => {
          console.error("Error creating offer.", e);
        });
    }

    stream.getTracks().forEach((track) => {
      track.onended = () => {
        // Handle track ended event
        setVideo(false);
        setAudio(false);
        try {
          let tracks = localVideoRef.current.srcObject.getTracks();
          tracks.forEach((track) => {
            track.stop();
          });
        } catch (e) {
          console.error("Error stopping media tracks.", e);
        }

        // TODO BlackSilence
        let BlackSilence = (...args) =>
          new MediaStream([black(...args), silence(...args)]);
        window.localStream = BlackSilence();
        localVideoRef.current.srcObject = window.localStream;

        for (let id in connections) {
          connections[id].addStream(window.localStream);
          connections[id]
            .createOffer()
            .then((description) => {
              connections[id]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id,
                    JSON.stringify({ sdp: connections[id].localDescription })
                  );
                })
                .catch((e) => {
                  console.error("Error setting local description.", e);
                });
            })
            .catch((e) => {
              console.error("Error creating offer.", e);
            });
        }
      };
    });
  };

  let silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();

    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };

  let black = ({ width = 640, height = 480 }) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });

    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream(30);
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({
          video: video,
          audio: audio,
        })
        .then(getUserMediaSuccess) // TODO: getUserMediaSuccess
        .then((stream) => {})
        .catch((e) => {
          console.log("Error accessing media devices.", e);
        });
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      } catch (e) {
        console.error("Error stopping media tracks.", e);
      }
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [video, audio]);

  // TODO

  let getMessageFromServer = (fromId, message) => {
    // Handle incoming messages from the server

    var signal = JSON.parse(message);

    if (signal !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socketRef.current.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        })
                      );
                    })
                    .catch((e) =>
                      console.error("Error setting local description.", e)
                    );
                })
                .catch((e) => console.error("Error creating answer.", e));
            }
          })
          .catch((e) => console.error("Error setting remote description.", e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.error("Error adding ICE candidate.", e));
      }
    }
  };

  // TODO

  let addMessage = (data, sender, socketIdSender) => {
      setMessages((prevMessages) => [...prevMessages, { sender: sender, text: data }]);
      if ( socketIdSender !== socketIdRef.current) {
        setNewMessages((prevCount) => prevCount + 1);
      }
  };

  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false });

    socketRef.current.on("signal", getMessageFromServer);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", window.location.href, username);
      getPermissions();

      socketIdRef.current = socketRef.current.id;

      socketRef.current.on("chat-message", addMessage);

      socketRef.current.on("user-left", (id) => {
        // Handle user left event
        setVideos((videos) => videos.filter((video) => video.socketId !== id));
      });

      socketRef.current.on("user-joined", (id, clients, usernames) => {
        console.log(`User joined: ${id} Clients:`, clients, "Usernames:", usernames);
        
        // Update usernames state
        if (usernames) {
          setUsernames(usernames);
        }
        
        // Check if clients is defined and is an array
        if (!clients || !Array.isArray(clients)) {
          console.warn("Clients is not an array or is undefined:", clients);
          return;
        }
        
        // Handle user joined event
        clients.forEach((socketListId) => {
          if (socketListId === socketIdRef.current) return; // Skip self
          
          connections[socketListId] = new RTCPeerConnection(peerConfigConnections);

          connections[socketListId].onicecandidate = (event) => {
            if (event.candidate !== null) {
              socketRef.current.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };

          connections[socketListId].onaddstream = (event) => {
            let ifVideoExists = videoRef.current.find(
              (video) => video.socketId === socketListId
            );

            if (ifVideoExists) {
              setVideos((videos) => {
                const updateVideos = videos.map((video) =>
                  video.socketId === socketListId
                    ? { ...video, stream: event.stream }
                    : video
                );
                videoRef.current = updateVideos;
                return updateVideos;
              });
            } else {
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoPlay: true,
                playsinline: true,
                username: usernames[socketListId] || "Anonymous",
              };
              setVideos((videos) => {
                const updatedVideos = [...videos, newVideo];
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            }
          };

          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            // TODO: Handle case where local stream is not available
            let BlackSilence = (...args) =>
              new MediaStream([black(...args), silence(...args)]);
            window.localStream = BlackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;

            try {
              connections[id2].addStream(window.localStream);

              connections[id2].createOffer().then((description) => {
                connections[id2]
                  .setLocalDescription(description)
                  .then(() => {
                    socketRef.current.emit(
                      "signal",
                      id2,
                      JSON.stringify({ sdp: connections[id2].localDescription })
                    );
                  })
                  .catch((e) => {
                    console.error("Error setting local description.", e);
                  });
              });
            } catch (e) {
              console.error("Error adding stream to connection.", e);
            }
          }
        }
      });
    });
  };

  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);

    connectToSocketServer();
  };

  let connect = () => {
    setAskForUsername(false);
    getMedia();
  };

  return (
    <div >
      
      {askForUsername === true ? (
        <div className={style.meetContainer}>
        <div className={style.lobbyContainer}>
          <h2> Start Video Call</h2>
          <TextField
            id="outlined-basic"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Enter Your Username"
            variant="outlined"
          />
          <Button variant="contained" onClick={connect}>
            Connect
          </Button>

          <div>
            <video
              className={style.meetUserVideo}
              ref={localVideoRef}
              autoPlay
              
            ></video>
          </div>
        </div>
        </div>
      ) : (
        <div className={style.VideoMeetChatContainer}>
        <div style={{width: showModal ? "70%" : "100%"}} className={style.meetVideoContainer}>
          

          <div className={style.buttonContainer}>
            <IconButton
              style={{ color: video ? "white" : "red" }}
              onClick={handleVideo}
            >
              {video === true ? <VideocamOffIcon /> : <VideocamIcon />}
            </IconButton>
            <IconButton onClick={handleEndCall} style={{ color: "red" }}>
              <CallEndIcon />
            </IconButton>
            <IconButton
              style={{ color: audio ? "white" : "red" }}
              onClick={handleAudio}
            >
              {audio === true ? <MicOffIcon /> : <MicOnIcon />}
            </IconButton>

            {screenAvailable && (
              <IconButton
                style={{ color: screen ? "white" : "red" }}
                onClick={handleScreen}
              >
                {screen ? <ScreenShareOffIcon /> : <ScreenShareIcon />}
              </IconButton>
            )}

            <Badge badgeContent={newMessages} max={999} color="primary">
              <IconButton
                style={{ color: newMessages > 0 ? "yellow" : "white" }}
                onClick={() => {
                  handleChat();
                }}
              >
                <ChatIcon />
              </IconButton>
            </Badge>
          </div>
          <div className={style.localVideoContainer}>
            <video
              className={style.meetUserVideo}
              ref={localVideoRef}
              autoPlay
            ></video>
            <div className={style.usernameOverlay}>
              {username || "You"}
            </div>
          </div>
          <div  className={style.conferenceView}>
            {videos.map((video) => (
              <div key={video.socketId} className={style.videoContainer}>
                <video
                  data-socket={video.socketId}
                  ref={(ref) => {
                    if (ref && video.stream) {
                      ref.srcObject = video.stream;
                    }
                  }}
                  autoPlay
                  playsInline
                ></video>
                <div className={style.usernameOverlay}>
                  {video.username || "Anonymous"}
                </div>
              </div>
            ))}
          </div>
          
        </div>

        {/* Chat Room starts from here */}
         <div style={{display: showModal ? "block" : "none"}} className={style.chatRoom}>

            <div className={style.chatContainer}>
               <h1 style={{textAlign: "center", backgroundColor: "green", color: "white"}}>Chat</h1>
                <div  className={style.messages}>
                  { messages.length > 0 ? messages.map((msg, index) => (

                      <div key={index} className={msg.sender === username ? style.yourMessage : style.otherMessage}>
                        <div>
                           <p style={{fontWeight:"bold", color: "black"}}>{msg.sender}:</p> {msg.text}
                        </div>
                       
                      </div>
                      
                    
                  )) : <h3 style={{textAlign: "center"}}>No Messages</h3>}
                  </div>
  

               <div className={style.chattingArea}>
                <TextField className={style.chatInput} id="outlined-basic" label="Enter Your Chat" variant="outlined" value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button variant="contained" onClick={sendMessage}>Send</Button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMeet;
