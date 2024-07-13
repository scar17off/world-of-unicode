/**
 * Represents a chunk in the game world.
 */
class Chunk {
    /**
     * Creates a new Chunk instance.
     * @param {number} x - The x-coordinate of the chunk.
     * @param {number} z - The z-coordinate of the chunk.
     * @param {Array} data - The blocks contained in the chunk.
     */
    constructor(x, z, data) {
        /**
         * The x-coordinate of the chunk.
         * @type {number}
         */
        this.x = x;

        /**
         * The z-coordinate of the chunk.
         * @type {number}
         */
        this.z = z;

        /**
         * The blocks contained in the chunk.
         * @type {Array<{ position: [number, number, number] }>}
         */
        this.data = data;
    }
}

module.exports = {
    Chunk
};