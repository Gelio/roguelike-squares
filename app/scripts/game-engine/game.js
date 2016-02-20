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
        this.player = new Player(); // TODO: initialize with base stats

        // TODO: add player onto the map
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

        let shouldMove = true;
        if(nextTile.type === TYPE.CREATURE) {
            shouldMove = this.battle(nextTile.content);

            if(!this.player.isAlive()) {
                // TODO: game over
            }
        }
        else if(nextTile.type === TYPE.GOLD)
            this.player.addGold(nextTile.content);
        else if(nextTile.type === TYPE.TRAPDOOR) {
            // TODO: Move to the next floor
        }
        else if(nextTile.type === TYPE.WEAPON) {
            this.player.setWeapon(nextTile.content);
        }

        if(shouldMove) {
            // TODO: move to next tile, clear previous tile
        }
    }

    battle(enemy) {
        if(!enemy instanceof Creature)
            throw 'Tile was of type CREATURE, but the content was not instance of Creature class';

        this.player.attack(enemy);

        if(enemy.isAlive()) {
            enemy.attack(this.player);
            return false;
        }
        else {
            // TODO: add player experience
            return true;
        }
    }
}