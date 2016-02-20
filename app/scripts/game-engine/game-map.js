import GameConfig from './game-config';
import Tile from './tile';

export default class GameMap {
    width = GameConfig.map.width;
    height = GameConfig.map.height;
    map = [];

    constructor() {
        for (let x = 0; x < this.width; x++) {
            this.map.push([]);      // add new array at this.map[x]
            for (let y = 0; y < this.height; y++)
                this.map[x].push( new Tile({ x, y }) );     // add an empty tile at this.map[x][y]
        }
    }
}