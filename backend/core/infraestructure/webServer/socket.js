var five = require("johnny-five"),
  board,
  led;
const { Server } = require("socket.io")

class Socket {
  constructor({ server }) {
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket) => {
      console.log("a user connected");
      socket.once('test',()=>{console.log('test')})
    });
  }

  
}
module.exports = Socket;
