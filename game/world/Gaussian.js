function gaussianRandom() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function seededGaussianRandom(seed) {
    let u = 0, v = 0;
    while (u === 0) u = seededRandom(seed++); // Converting [0,1) to (0,1)
    while (v === 0) v = seededRandom(seed++);
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function generateGaussianTerrain(seed, width, height) {
    const terrain = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const elevation = seededGaussianRandom(seed + x * height + y);
            terrain.push({ position: [x, elevation, y] });
        }
    }
    return terrain;
}

module.exports = {
    gaussianRandom,
    seededRandom,
    seededGaussianRandom,
    generateGaussianTerrain
}