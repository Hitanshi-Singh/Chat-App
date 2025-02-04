"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allsockets = [];
wss.on("connection", (socket) => {
    allsockets.push(socket);
    userCount++;
    console.log("User connected #", userCount);
    socket.on("message", (msg) => {
        console.log("Received from client : ", msg.toString());
        const sendMessageArray = allsockets.filter(x => x != socket);
        sendMessageArray.forEach((e) => {
            e.send(msg.toString());
        });
    });
    socket.on("close", () => {
        console.log(socket, "disconnected");
        allsockets = allsockets.filter(x => x != socket);
        userCount--;
    });
});
