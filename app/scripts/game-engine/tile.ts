/// <reference path="interfaces" />

import TYPE from './types';
import COLOR from './colors';

import Creature from './creature';
import Player from './player';

import { TileParameters, Position } from './interfaces';

export default class Tile {
    x: number;
    y: number;
    type: TYPE;
    content: any;

    constructor({ x, y, type = TYPE.WALL, content = null }: TileParameters) {
        this.x = x;
        this.y = y;
        this.setType(type);
        this.setContent(content);
    }

    getPosition(): Position {
        return {x: this.x, y: this.y};
    }

    setType(newType: TYPE): void {
        /*let found = false;
        for (let currType in TYPE) {
            if (TYPE[currType] === newType) {
                found = true;
                break;
            }
        }*/

        //if (found)
            this.type = newType;
        /*else
            throw 'Tile type to be set is invalid (was not found in the TYPE object)';*/

    }

    setContent(newContent: any): void {
        if(Player.isPlayer(newContent)) {
            if(this.type !== TYPE.PLAYER)
                throw 'Tried to set content to a player but the type is wrong';
        }
        else if(Creature.isCreature(newContent)) {
            if(this.type !== TYPE.CREATURE)
                throw 'Tried to set content to a creature but the type is wrong';
        }
        else if(newContent === null) {
            if(this.type !== TYPE.EMPTY && this.type !== TYPE.WALL && this.type !== TYPE.TRAPDOOR)
                throw 'Tried to set content to null but the type is wrong';
        }

        this.content = newContent;
    }

    get color(): string {
        return COLOR[this.type];
    }

    clear(): void {
        this.setType(TYPE.EMPTY);
        this.setContent(null);
    }

    isEmpty(): boolean {
        return this.type === TYPE.EMPTY;
    }
}