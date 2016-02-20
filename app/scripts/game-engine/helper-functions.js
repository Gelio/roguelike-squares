import GameConfig from './game-config';
import MapGenerator from './map-generator';

export function randomizeStat(value) {
    // value * (0.9 - 1.1) for randomVariance = 10
    return Math.round(value * (100 - GameConfig.randomVariance + MapGenerator.randomNumber(GameConfig.randomVariance*2)) / 100);
}

export function getDistance(pos1, pos2) {
    return Math.sqrt(
        Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
    );
}