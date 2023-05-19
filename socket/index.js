const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A user connected.");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("User ID: " + userId);
    console.log("Socket ID: " + socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user && user.socketId) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.log("User not found or socketId is missing.");
    }
  });

  socket.on("addUsers", (users) => {
    users.forEach((user) => {
      addUser(user.userId, socket.id);
    });
    io.emit("getUsers", users);
  });

  socket.on("connect", () => {
    io.emit("getUsers", users);
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected.");
    removeUser(socket.id);
  });
});
