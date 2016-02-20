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
        if(this.rooms.length > 1)
            this.makeTunnel(room, this.rooms[this.rooms.length-1]);

        return true;
    }

    makeTunnel(room1, room2) {
        // TODO
        let center1 = MapGenerator.getCenter(room1),
            center2 = MapGenerator.getCenter(room2);

        if(Math.random()%2 == 0) {
            // Horizontal, then vertical
            this.makeHorizontalTunnel(center1.x, center2.x, center1.y);
            this.makeVerticalTunnel(center2.x, center1.y, center2.y);
        }
        else {
            // Vertical, then horizontal
            this.makeVerticalTunnel(center1.x, center1.y, center2.y);
            this.makeHorizontalTunnel(center1.x, center2.x, center2.y);
        }
    }

    makeHorizontalTunnel(fromX, toX, y) {
        if (!this.map.isValidPosition({x: fromX, y}) || !this.map.isValidPosition({x: toX, y}))
            throw 'Tunnel cannot be created because positions are invalid';

        if (fromX > toX) {
            let temp = fromX;
            fromX = toX;
            toX = temp;
        }

        for (let x = fromX; x < toX; x++)
            this.map.clearTile({x, y});
    }


    makeVerticalTunnel(x, fromY, toY) {
        if(!this.map.isValidPosition({x, y: fromY}) || !this.map.isValidPosition({x, y: toY}))
            throw 'Tunnel cannot be created because positions are invalid';

        if (fromY > toY) {
            let temp = fromY;
            fromY = toY;
            toY = temp;
        }

        for (let y = fromY; y < toY; y++)
            this.map.clearTile({x, y});
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