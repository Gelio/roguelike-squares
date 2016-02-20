import React from 'react';

import GameEngine from '../game-engine/game';

import Map from './Map';
import StatsBar from './StatsBar';

export default class Game extends React.Component {
    constructor() {
        super();

        this.game = new GameEngine();
    }

    newGame() {
        this.game = new GameEngine();
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <StatsBar player={this.game.player} floor={this.game.floor} gameOver={this.game.gameOver} newGame={this.newGame.bind(this)} />

                <Map gameMap={this.game.gameMap} handleMove={this.game.handleMove.bind(this.game)} forceUpdate={this.forceUpdate.bind(this)} />

                <div class="text-xs-center m-t-1">
                    <button class="btn btn-primary" onClick={this.newGame.bind(this)}>Restart</button>
                </div>
            </div>
        );
    }
}