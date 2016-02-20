import GameConfig from './game-config';

import GameMap from './game-map';

export default class MapGenerator {
    map;
    rooms;


    constructor(map) {
        if(!map instanceof GameMap)
            throw 'Map passed to a map generator was not an instance of GameMap class';

        this.map = map;
        this.rooms = [];
    }

    makeRoom(room) {
        let { x, y, w, h } = room,
            intersect = false;

        if(!this.map.isValidPosition({x, y}) || !this.map.isValidPosition({x: x+w, y: y+h}))
            throw 'Room corners are not valid positions on the map';

        this.rooms.forEach((existingRoom) => {
            if(MapGenerator.doIntersect(existingRoom, room))
                intersect = true;
        });

        if(intersect)
            return false;

        this.map.emptyArea({
            x: x+1,
            y: y+1,
            w: w-1,
            h: h-1
        });

        this.rooms.push(room);
        return true;
    }

    static doIntersect(room1, room2) {
        return (room1.x <= (room2.x + room2.w) && (room1.x + room1.w) >= room2.x &&
                room1.y <= (room2.y + room2.h) && (room1.y + room1.h) >= room2.y);
    }

    static getCenter({x, y, w, h}) {
        return {
            x: Math.ceil(x + (w / 2)),
            y: Math.ceil(y + (h / 2))
        }
    }
}