import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};
let usernames = {};

const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join-call", (path, username) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }
      connections[path].push(socket.id);
      usernames[socket.id] = username || "Anonymous";
      timeOnline[socket.id] = Date.now();

      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path],
          usernames
        );
      }

      if (messages[path] !== undefined) {
        messages[path].forEach((message) => {
          io.to(socket.id).emit(
            "chat-message",
            message.sender,
            message.data,
            message.socketIdSender
          );
        });
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }

          return [room, isFound];
        },
        ["", false]
      );

      if (found === true) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          sender: sender,
          data: data,
          socketIdSender: socket.id,
        });

        console.log(`message : ${matchingRoom} : ${data} : ${sender} `);

        connections[matchingRoom].forEach((elem) => {
          io.to(elem).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    socket.on("disconnect", () => {
      var diffTime = Date.now() - timeOnline[socket.id];

      var key;

      for (const [room, users] of JSON.parse(
        JSON.stringify(Object.entries(connections))
      )) {
        for (let a = 0; a < users.length; ++a) {
          if (users[a] === socket.id) {
            key = room;

            for (let b = 0; b < connections[key].length; ++b) {
              io.to(connections[key][b]).emit("user-left", socket.id, diffTime);
            }
            const index = connections[key].indexOf(socket.id);

            if (index > -1) {
              connections[key].splice(index, 1); // Remove the socket from the room
            }

            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }

      console.log(
        `Client disconnected: ${socket.id}, Time online: ${diffTime} ms`
      );
    });
  });

  return io;
};

export { connectToSocket };
