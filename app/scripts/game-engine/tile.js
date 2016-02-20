import TYPE from './types';
import COLOR from './colors';

import Creature from './creature';
import Player from './player';

export default class Tile {
    x;
    y;
    type;
    content;

    constructor({ x, y, type = TYPE.WALL, content = null }) {
        this.x = x;
        this.y = y;
        this.setType(type);
        this.setContent(content);
    }

    getPosition() {
        return {x: this.x, y: this.y};
    }

    setType(newType) {
        let found = false;
        for (let currType in TYPE) {
            if (TYPE[currType] === newType) {
                found = true;
                break;
            }
        }

        if (found)
            this.type = newType;
        else
            throw 'Tile type to be set is invalid (was not found in the TYPE object)';

    }

    setContent(newContent) {
        if(Creature.isCreature(newContent)) {
            if(this.type !== TYPE.CREATURE)
                throw 'Tried to set content to a creature but the type is wrong';
        }
        else if(Player.isPlayer(newContent)) {
            if(this.type !== TYPE.PLAYER)
                throw 'Tried to set content to a player but the type is wrong';
        }
        else if(newContent === null) {
            if(this.type !== TYPE.EMPTY && this.type !== TYPE.WALL)
                throw 'Tried to set content to null but the type is wrong';
        }

        this.content = newContent;
    }

    get color() {
        return COLOR.get(this.type);
    }

    clear() {
        this.setType(TYPE.EMPTY);
        this.setContent(null);
    }
}