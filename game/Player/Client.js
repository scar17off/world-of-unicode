const SocketIO = require("socket.io");

const Player = require("./Player.js");

/**
 * Represents a client connected to the server.
 */
class Client {
    /**
     * Creates a new Client instance.
     * @param {WebSocket} ws - The WebSocket connection of the client.
     */
    constructor(ws) {
        /**
         * The WebSocket connection of the client.
         * @type {SocketIO.Socket}
         */
        this.ws = ws;

        /**
         * The IP address of the client.
         * @type {string}
         */
        this.ip = ws.remoteAddress;

        /**
         * The ID of the client.
         * @type {number}
         */
        this.id = server.clients.length + 1;

        /**
         * The socket ID of the client.
         * @type {string}
         */
        this.sid = ws.id;

        this.player = new Player();
        this.player.name = "Player " + this.id;
    }

    /**
     * Sends an event to the client.
     * @param {string} event - The event to send.
     * @param {any} data - The data to send.
     */
    emit(event, data) {
        this.ws.emit(event, data);
    }

    /**
     * Sends a message to the client.
     * @param {string} message - The message to send.
     */
    send(message) {
        this.ws.emit("chat", message);
    }
}

module.exports = Client;