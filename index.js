const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: "http://localhost:3000"
}));

const { loadChunks, TYPE } = require("./game/world/Generation");
const { Chunk } = require("./game/world/Chunk");

/**
 * @type {object}
 * @global
 */
global.server = {
    /**
     * @type {Server}
     */
    io: io,
    /**
     * @type {Client[]}
     */
    clients: [],
    /**
     * @type {Chunk[]}
     */
    terrain: loadChunks(12345, 0, 0, 1, 1, TYPE.FLAT)
}

const Client = require("./game/Player/Client");

io.on("connection", (socket) => {
    const client = new Client(socket);
    server.clients.push(client);

    console.log(`Client ${client.name} connected`);

    socket.on("disconnect", () => {
        server.clients = server.clients.filter(c => c.sid !== client.sid);
        console.log(`Client ${client.name} disconnected`);
    });
});

httpServer.listen(3001, () => {
    console.log("Server is running on port 3001");
});