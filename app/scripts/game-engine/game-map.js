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
        weapon.attackValue = Number(weapon.attackValue);

        if(!weapon.attackValue)
            throw 'Weapon\'s attack value is not a number';

        if(!weapon.name)
            throw 'Weapon does not have a name';

        if (!this.isValidDestination({x, y}))
            throw 'Tried to insert a weapon at an invalid destination';

        let tile = this.getTile({x, y});
        tile.setType(TYPE.WEAPON);
        tile.setContent(weapon);
    }

    insertGold({x, y, amount}) {
        amount = Number(amount);

        if(!amount)
            throw 'Amount of gold to be inserted is not a number';

        if (!this.isValidDestination({x, y}))
            throw 'Tried to insert gold at an invalid destination';

        let tile = this.getTile({x, y});
        tile.setType(TYPE.GOLD);
        tile.setContent(amount);
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
        healAmount = Number(healAmount);
        if(!healAmount)
            throw 'Heal amount is not a number';

        if (!this.isValidDestination({x, y}))
            throw 'Tried to insert a health potion at an invalid destination';

        let tile = this.getTile({x, y});
        tile.setType(TYPE.HEALTH_POTION);
        tile.setContent(healAmount);
    }

    clearTile({x, y}) {
        if (!this.isValidPosition({x, y}))
            throw 'Position to be cleared was invalid';

        this.getTile({x, y}).clear();
    }

    emptyArea(area) {
        for (let x = area.x; x < area.x + area.w; x++)
            for (let y = area.y; y < area.y + area.h; y++)
                this.clearTile({x, y});
    }
}