/**
 * Represents a player in the game.
 */
class Player {
    /**
     * Creates a new player instance.
     */
    constructor() {
        /**
         * The name of the player.
         * @type {string}
         */
        this.name = "";

        /**
         * The position of the player in 3D space.
         * @type {number[]}
         */
        this.position = [0, 0, 0];

        /**
         * The rotation of the player in 3D space.
         * @type {number[]}
         */
        this.rotation = [0, 0, 0];

        /**
         * The velocity of the player in 3D space.
         * @type {number[]}
         */
        this.velocity = [0, 0, 0];

        /**
         * The speed of the player.
         * @type {number}
         */
        this.speed = 0.2;
    }

    /**
     * Gets the state of the player.
     * @returns {object} The state of the player.
     */
    getState() {
        return {
            name: this.name,
            position: this.position,
            rotation: this.rotation,
            velocity: this.velocity
        };
    }
}

module.exports = Player;