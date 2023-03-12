import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import MessageModel from "./api/models/Message.model";

const wss = new WebSocket.Server({ port: 8080 });
let roomId: string;
let clients: any = [];

function createRoom() {
  roomId = uuidv4();
}

wss.on("connection", (ws) => {
  clients.push(ws);

  let otherClient: any = clients.find((client: WebSocket) => client !== ws);
  if (otherClient) {
    otherClient.send("User Joined");
    ws.send(`Room Id :${roomId}`);
  } else {
    createRoom();
    ws.send(`Room Id :${roomId}`);
    ws.send("Nobody in this room");
  }

  ws.on("message", async (message: string) => {
    const messageDetails = JSON.parse(message);
    const saveMessage = await MessageModel.create({
      roomId: roomId,
      message: messageDetails.message,
      userId: messageDetails.userId,
    });
    otherClient = clients.find((client: WebSocket) => client !== ws);

    if (otherClient) {
      otherClient.send(message);
    }
  });

  ws.on("close", () => {
    clients = clients.filter((client: WebSocket) => client !== ws);
  });
});
