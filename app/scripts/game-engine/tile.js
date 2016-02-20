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
        this.content = content;
        this.changeType(type);
    }

    getPosition() {
        return {x: this.x, y: this.y};
    }

    changeType(newType) {
        let found = false;
        for (let currType of TYPE) {
            if (currType === newType)
                found = true;
        }

        if (found) {
            this.type = newType;
            return true;
        }
        else
            throw 'Tile type to be set is invalid (was not found in the TYPE object)';

    }

    get color() {
        return COLOR.get(this.type);
    }

    clear() {
        this.content = null;
        return this.changeType(TYPE.EMPTY);
    }
}