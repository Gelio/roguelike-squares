import GameConfig from './game-config';
import TYPE from './types';

import Creature from './creature';
import GameMap from './game-map';
import Player from './player';

export default class Game {
    constructor() {
        this.gameMap = new GameMap();
        this.floor = 1;
        this.playerPos = {
            x: 0,
            y: 0
        };
        this.player = new Player(GameConfig.playerBaseStats);


        this.gameMap.insertPlayer({x: this.playerPos.x, y: this.playerPos.y, player: this.player});
    }

    movePlayer(prevPos, nextPos) {
        let {x: prevX, y: prevY} = prevPos,
            {x: nextX, y: nextY} = nextPos;

        let prevTile = this.gameMap.getTile(prevPos),
            nextTile = this.gameMap.getTile(nextPos);

        if (!prevTile.content instanceof Player)
            throw 'Tried to move a non-player tile';

        if (!prevTile.content.isAlive())
            throw 'Tried to move a dead player';

        if (!this.gameMap.isValidDestination(nextPos))
            return false;

        let shouldMove = true;
        if (nextTile.type === TYPE.CREATURE) {
            shouldMove = this.battle(nextTile.content);

            if (!this.player.isAlive()) {
                // TODO: game over
                return false;
            }
        }
        else if (nextTile.type === TYPE.GOLD)
            this.player.addGold(nextTile.content);
        else if (nextTile.type === TYPE.TRAPDOOR) {
            this.floor++;
            // TODO: Generate new map, insert items, player
        }
        else if (nextTile.type === TYPE.WEAPON) {
            this.player.setWeapon(nextTile.content);
        }

        if (shouldMove) {
            this.gameMap.clearTile(prevPos);
            this.gameMap.insertPlayer({x: nextX, y: nextY, player: this.player});
        }
    }

    battle(enemy) {
        if (!enemy instanceof Creature)
            throw 'Tile was of type CREATURE, but the content was not instance of Creature class';

        this.player.attack(enemy);

        if (enemy.isAlive()) {
            enemy.attack(this.player);
            return false;
        }
        else {
            this.player.addExperience(this.floor * GameConfig.experiencePerFloorMultiplier);
            return true;
        }
    }
}