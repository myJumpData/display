import { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";

export default function SocketHandler(
  req: NextApiRequest,
  res: NextApiResponse | any
) {
  if (!res.socket.server.io) {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    console.log("Socket initialized");
  } else {
    console.log("Socket already initialized");
  }
  res.socket.server.io.on("connection", (socket: Socket) => {
    socket.join(socket.id);
  });
  res.end();
}
