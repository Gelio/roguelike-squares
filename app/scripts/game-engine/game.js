import GameConfig from './game-config';
import TYPE from './types';

import Creature from './creature';
import GameMap from './game-map';
import MapGenerator from './map-generator';
import Player from './player';

export default class Game {
    constructor() {
        this.gameMap = new GameMap();
        this.floor = 1;
        this.playerPos = {
            x: 1,
            y: 1
        };
        this.player = new Player(GameConfig.playerBaseStats);

        this.generateMap();
        this.gameMap.insertPlayer({x: this.playerPos.x, y: this.playerPos.y, player: this.player});
    }

    generateMap() {
        let mapGenerator = new MapGenerator(this.gameMap);
        mapGenerator.generateMap();
        mapGenerator.addEnemies(this.floor);
        mapGenerator.addHealthPotions(this.floor);
        mapGenerator.addWeapon(this.floor);
        mapGenerator.addGold(this.floor);

        if(this.floor < GameConfig.floorLimit)
            mapGenerator.addTrapdoor();

        this.playerPos = MapGenerator.getCenter(mapGenerator.rooms[0]);
    }

    movePlayer(prevPos, nextPos) {
        let {x: prevX, y: prevY} = prevPos,
            {x: nextX, y: nextY} = nextPos;

        let prevTile = this.gameMap.getTile(prevPos),
            nextTile = this.gameMap.getTile(nextPos);

        if (!Player.isPlayer(prevTile.content))
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

            if(this.floor == GameConfig.floorLimit && this.gameMap.enemiesLeft === 0) {
                // TODO: game ovew - player won
                return false;
            }
        }
        else if (nextTile.type === TYPE.GOLD)
            this.player.addGold(nextTile.content);
        else if (nextTile.type === TYPE.TRAPDOOR) {
            this.floor++;
            this.gameMap = new GameMap();

            this.generateMap();
            this.gameMap.insertPlayer({x: this.playerPos.x, y: this.playerPos.y, player: this.player});
            shouldMove = false;
        }
        else if (nextTile.type === TYPE.WEAPON)
            this.player.setWeapon(nextTile.content);
        else if (nextTile.type === TYPE.HEALTH_POTION)
            this.player.heal(nextTile.content);

        if (shouldMove) {
            this.gameMap.clearTile(prevPos);
            this.gameMap.insertPlayer({x: nextX, y: nextY, player: this.player});
            this.playerPos = nextPos;
        }
    }

    battle(enemy) {
        if (!Creature.isCreature(enemy))
            throw 'Tile was of type CREATURE, but the content was not instance of Creature class';

        this.player.attack(enemy);

        if (enemy.isAlive()) {
            enemy.attack(this.player);
            return false;
        }
        else {
            this.player.addExperience(this.floor * GameConfig.experiencePerFloorMultiplier);
            this.gameMap.enemiesLeft--;
            return true;
        }
    }

    handleMove(direction) {
        let newPosition = Object.create(this.playerPos);
        if(direction === 0)
            newPosition.x--;
        else if(direction === 1)
            newPosition.y--;
        else if(direction === 2)
            newPosition.x++;
        else if(direction === 3)
            newPosition.y++;

        if(this.gameMap.isValidDestination(newPosition))
            this.movePlayer(this.playerPos, newPosition);
    }
}