import GameConfig from './game-config';
import MapGenerator from './map-generator';

import { Position } from './interfaces';

export function randomizeStat(value: number): number {
    // value * (0.9 - 1.1) for randomVariance = 10
    return Math.round(value * (100 - GameConfig.randomVariance + MapGenerator.randomNumber(GameConfig.randomVariance*2)) / 100);
}

export function getDistance(pos1: Position, pos2: Position): number {
    return Math.sqrt(
        Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
    );
}