const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: true,
});

let emailToSocketId = new Map();
let socketIdTOEmail = new Map();

io.on("connection", (socket) => {
  console.log(`socket connected : ${socket.id}`);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketId.set(email, socket.id);
    socketIdTOEmail.set(socket.id, email);
    io.to(socket.id).emit("room:join", data);
  });
});

httpServer.listen(8000);
