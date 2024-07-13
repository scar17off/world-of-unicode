const Client = require("./Client");

/**
 * Get a client by its ID.
 * @param {number} id - The ID of the client.
 * @returns {Client} The client.
 */
function getClientById(id) {
    return server.clients.find(client => client.id === id);
}

module.exports = {
    getClientById
}