import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
let allsockets:WebSocket[]=[];

wss.on("connection", (socket) => {
    allsockets.push(socket)
  userCount++;
  console.log("User connected #", userCount);
  socket.on("message", (msg) => {
    console.log("Received from client : ",msg.toString());
    const sendMessageArray=allsockets.filter(x=>x!=socket);
    sendMessageArray.forEach((e)=>{
        e.send(msg.toString());
    })
    
  });
  socket.on("close",()=>{
    console.log(socket,"disconnected")
    allsockets=allsockets.filter(x=>x!=socket);
    
    userCount--;
  })
});
