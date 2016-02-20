import GameConfig from './game-config';
import TYPE from './types';

import Creature from './creature';
import GameMap from './game-map';
import Player from './player';

export default class Game {
    constructor() {
        this.gameMap = new GameMap();
        this.level = 1;
        this.playerPos = {
            x: 0,
            y: 0
        };
        this.player = new Player(); // initialize with base stats

        // add player onto the map
    }

    movePlayer(prevPos, nextPos) {
        let {x: prevX, y: prevY} = prevPos,
            {x: nextX, y: nextY} = nextPos;

        let prevTile = this.gameMap.getTile(prevPos),
            nextTile = this.gameMap.getTile(nextPos);

        if(!prevTile.content instanceof Creature)
            throw 'Tried to move a non-creature tile';

        if(!this.gameMap.isValidDestination(nextPos))
            return false;

        let shouldMove = false;
        if(nextTile.type === TYPE.CREATURE) {
            // TODO: Battle
        }
        else if(nextTile.type === TYPE.GOLD) {
            // TODO: Pick up gold
        }
        else if(nextTile.type === TYPE.TRAPDOOR) {
            // TODO: Move to the next floor
        }
        else if(nextTile.type === TYPE.WEAPON) {
            // TODO: Pick up new weapon
        }

        if(shouldMove) {
            // TODO
        }
    }
}