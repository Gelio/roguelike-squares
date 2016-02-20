import GameConfig from './game-config';

import Creature from './creature';
import GameMap from './game-map';

export default class MapGenerator {
    map;
    rooms;


    constructor(map) {
        if(!map instanceof GameMap)
            throw 'Map passed to a map generator was not an instance of GameMap class';

        this.map = map;
        this.rooms = [];
        this.widthDifference = GameConfig.roomSize.maxWidth - GameConfig.roomSize.minWidth;
        this.heightDifference = GameConfig.roomSize.maxHeight - GameConfig.roomSize.minHeight;
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

    addTunnels() {
        this.rooms.reduce((previous, current) => {
            this.makeTunnel(previous, current);
            return current;
        });
    }

    addRooms() {
        for(let i = 0; i < GameConfig.roomsPerFloor; i++)
            this.makeRoom(this.randomRoomPosition());
    }

    addEnemies(floor) {
        for (let i = 0; i < GameConfig.enemiesPerFloor; i++)
            this.makeEnemy(floor);
    }


    makeEnemy(floor) {
        let insertPosition,
            enemy;

        do {
            insertPosition = MapGenerator.randomPosition(this.getRandomRoom())
        } while(!this.map.getTile(insertPosition).isEmpty());

        enemy = new Creature({
            health: 5,  // TODO: make these stats dynamic with regard to floor
            attack: 2
        });

        this.map.insertCreature({
            x: insertPosition.x,
            y: insertPosition.y,
            creature: enemy
        });
    }

    addHealthPotions(floor) {
        for (let i = 0; i < GameConfig.healthPotionsPerFloor; i++)
            this.makeHealthPotion(floor);
    }

    makeHealthPotion(floor) {
        let insertPosition;

        do {
            insertPosition = MapGenerator.randomPosition(this.getRandomRoom())
        } while(!this.map.getTile(insertPosition).isEmpty());

        this.map.insertHealthPotion({
            x: insertPosition.x,
            y: insertPosition.y,
            healAmount: floor       // TODO: make these stats dynamic with regard to floor
        });
    }

    randomRoomPosition() {
        let newRoom = {
            x: 0,
            y: 0,
            w: GameConfig.roomSize.minWidth + MapGenerator.randomNumber(this.widthDifference),
            h: GameConfig.roomSize.minHeight + MapGenerator.randomNumber(this.heightDifference)
        };

        newRoom.x = MapGenerator.randomNumber(GameConfig.map.width - newRoom.w);
        newRoom.y = MapGenerator.randomNumber(GameConfig.map.height - newRoom.h);

        for(let i = 0; i < this.rooms; i++) {
            if(MapGenerator.doIntersect(this.rooms[i], newRoom))
                return this.randomRoomPosition();
        }

        return newRoom;
    }

    makeTunnel(room1, room2) {
        let center1 = MapGenerator.getCenter(room1),
            center2 = MapGenerator.getCenter(room2);

        if(Math.floor(Math.random()*2) == 0) {
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

    generateMap() {
        this.addRooms();
        this.addTunnels();

        // Add
    }

    getRandomRoom() {
        return this.rooms[MapGenerator.randomNumber(this.rooms.length)];
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

    static randomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    static randomPosition(room) {
        return {
            x: room.x + MapGenerator.randomNumber(room.w),
            y: room.y + MapGenerator.randomNumber(room.h)
        };
    }
}