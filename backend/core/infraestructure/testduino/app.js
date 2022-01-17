var five = require("johnny-five"), board, led;

class TestDuino {
  constructor({socket}) {
    this.five = five;
    this.board = board;
    this.led = led;
    this.io = socket.io;
    io.on("connection", (socket) => {
      console.log("a user connected");
    });
  }

  
}

module.exports = TestDuino;