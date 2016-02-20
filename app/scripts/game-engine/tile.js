import TYPE from './types';

export default class Tile {
    x;
    y;
    type;

    constructor({ x, y, type = TYPE.WALL }) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    getPosition() {
        return {x: this.x, y: this.y};
    }
}