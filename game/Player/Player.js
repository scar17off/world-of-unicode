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

        /**
         * The animation of the player.
         * @type {string}
         */
        this.animation = "idle";
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
            velocity: this.velocity,
            animation: this.animation
        };
    }

    /**
     * Updates the player's position.
     * @param {object} movementData - The movement data containing direction and speed.
     */
    updatePosition(movementData) {
        this.position[0] += movementData.x;
        this.position[1] += movementData.y;
        this.position[2] += movementData.z;

        if (movementData.x !== 0 || movementData.y !== 0 || movementData.z !== 0) {
            this.animation = "walk";
        } else {
            this.animation = "idle";
        }
    }

    /**
     * Gets the player's current position.
     * @returns {object} The player's position.
     */
    getPosition() {
        return this.position;
    }
}

module.exports = Player;