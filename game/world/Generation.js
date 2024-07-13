const { seededGaussianRandom } = require('./Gaussian');
const { Chunk } = require('./Chunk');

const TYPE = {
    TERRAIN: 'TERRAIN',
    FLAT: 'FLAT'
};

function loadChunks(seed, centerX, centerZ, distance, maxChunks, type = TYPE.FLAT) {
    const chunks = {};
    let chunkCount = 0;

    for (let cx = centerX - distance; cx <= centerX + distance; cx++) {
        for (let cz = centerZ - distance; cz <= centerZ + distance; cz++) {
            if (chunkCount >= maxChunks) {
                return chunks;
            }
            const chunk = generateChunk(seed, cx, cz, type);
            chunks[`${cx},${cz}`] = chunk;
            chunkCount++;
        }
    }

    return chunks;
}

function generateChunk(seed, chunkX, chunkZ, type) {
    const data = [];
    const height = 3;
    for (let x = 0; x < 16; x++) {
        for (let z = 0; z < 16; z++) {
            for (let y = 0; y < height; y++) {
                const positions = new Set();
                let elevation;
                if (type === TYPE.TERRAIN) {
                    elevation = seededGaussianRandom(seed + (chunkX * 16 + x) * height + (chunkZ * 16 + z) + y);
                    elevation = Math.round(elevation);
                } else {
                    elevation = 0;
                }
                const positionKey = `${chunkX * 16 + x},${elevation},${chunkZ * 16 + z}`;
                if (!positions.has(positionKey)) {
                    data.push({ position: [chunkX * 16 + x, elevation, chunkZ * 16 + z] });
                    positions.add(positionKey);
                }
            }
        }
    }
    return new Chunk(chunkX, chunkZ, data);
}

module.exports = {
    loadChunks,
    generateChunk,
    TYPE
}