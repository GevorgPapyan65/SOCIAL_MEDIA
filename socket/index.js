const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });


  let users = []
const addUser = (userId, socketId) =>{
    !users.some((user) => user.userId === userId) &&
    users.push({userId,socketId})
}
const removeUser = (socketId) =>{
  users = users.filter(user=>user.socketId !== socketId)
}
  const getUser = (userId) =>{
    return users.find(user=>user.userId === userId)
  }


  io.on("connection", (socket) => {
    //when connect
    console.log("a user connected.");
    //take userId and socketId from user
    socket.on("addUser", userId=>{
        addUser(userId,socket.id);
        console.log("User ID " + userId)
        console.log("Socket ID " + socket.id);
        io.emit("getUsers", users)
    })

    //send a message
    socket.on("sendMessage", ({senderId, receiverId,text})=>{
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text
      })
    })
    socket.on("addUsers", (users) => {
      users.forEach((user) => {
        addUser(user.userId, socket.id);
      });
      io.emit("getUsers", users);
    });
    
    // Emit all users on connection
    socket.on("connect", () => {
      io.emit("getUsers", users);
    });
    //when disconnect
    socket.on("disconnect", ()=>{
      console.log("user was disconnected"),
      removeUser(socket.id)
    })
})