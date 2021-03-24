let io;

exports.init = function (server) {
  io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
};

exports.getIo = function () {
  try {
    if (io) return io;
    else throw new Error("Cannot use socket io before initialization");
  } catch (err) {
    throw err;
  }
};
