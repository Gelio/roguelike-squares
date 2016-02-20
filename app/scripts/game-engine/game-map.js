import GameConfig from './game-config';
import TYPE from './types';

import Creature from './creature';
import Player from './player';
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

    getTile({x, y}) {
        return this.map[x][y];
    }

    isValidDestination({x, y}) {
        let tile = this.getTile({x, y});
        if(tile.type === TYPE.WALL || x < 0 || x >= this.width || y < 0 || y >= this.height)
            return false;

        return true;
    }

    insertCreature({x, y, creature}) {
        // TODO
    }

    insertWeapon({x, y, weapon}) {
        // TODO
    }

    insertGold({x, y, amount}) {
        // TODO
    }

    insertPlayer({x, y, player}) {
        // TODO
    }

    clearTile({x, y}) {
        // TODO: set this tile as an empty type and remove content (set to null)
    }
}