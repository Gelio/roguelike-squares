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
                this.map[x].push(new Tile({x, y}));     // add an empty tile at this.map[x][y]
        }
    }

    getTile({x, y}) {
        if (!this.isValidPosition({x, y}))
            return undefined;

        return this.map[x][y];
    }

    isValidPosition({x, y}) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height)
            return false;

        return true;
    }

    isValidDestination({x, y}) {
        let tile = this.getTile({x, y});
        if (tile.type === TYPE.WALL || !this.isValidPosition({x, y}))
            return false;

        return true;
    }

    insertCreature({x, y, creature}) {
        if (!Creature.isCreature(creature))
            throw 'Entity to be inserted was not a creature';

        if (!this.isValidDestination({x, y}))
            throw 'Tried to insert a creature at an invalid destination';

        let tile = this.getTile({x, y});
        tile.setType(TYPE.CREATURE);
        tile.setContent(creature);
    }

    insertWeapon({x, y, weapon}) {
        // TODO
        if (!this.isValidDestination({x, y}))
            throw 'Tried to insert a weapon at an invalid destination';


    }

    insertGold({x, y, amount}) {
        // TODO
        if (!this.isValidDestination({x, y}))
            throw 'Tried to insert gold at an invalid destination';
    }

    insertPlayer({x, y, player}) {
        if (!Player.isPlayer(player))
            throw 'Entity to be inserted was not a player';

        if (!this.isValidDestination({x, y}))
            throw 'Tried to insert a player at an invalid destination';

        let tile = this.getTile({x, y});
        tile.setType(TYPE.PLAYER);
        tile.setContent(player);
    }

    insertHealthPotion({x, y, healAmount}) {
        // TODO
        if (!this.isValidDestination({x, y}))
            throw 'Tried to insert a health potion at an invalid destination';
    }

    clearTile({x, y}) {
        if (!this.isValidPosition({x, y}))
            throw 'Position to be cleared was invalid';

        this.getTile({x, y}).clear();
    }
}