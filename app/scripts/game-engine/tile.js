import TYPE from './types';
import COLOR from './colors';

export default class Tile {
    x;
    y;
    type;
    content;

    constructor({ x, y, type = TYPE.WALL, content = NULL }) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.content = content;
    }

    getPosition() {
        return {x: this.x, y: this.y};
    }

    changeType(newType) {
        let found = false;
        for(let currType of TYPE) {
            if(currType === newType)
                found = true;
        }

        if(found) {
            this.type = newType;
            return true;
        }
        else
            return false;

    }

    get color() {
        return COLOR.get(this.type);
    }
}