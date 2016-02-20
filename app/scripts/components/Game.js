import React from 'react';

import GameEngine from '../game-engine/game';

import Map from './Map';
import StatsBar from './StatsBar';

export default class Game extends React.Component {
    constructor() {
        super();

        this.game = new GameEngine();

        this.state = {
            fogActive: true
        };
    }

    newGame() {
        this.game = new GameEngine();
        this.forceUpdate();
    }

    toggleFog() {
        this.setState({
            fogActive: !this.state.fogActive
        });
    }

    render() {
        return (
            <div>
                <StatsBar player={this.game.player} floor={this.game.floor} gameOver={this.game.gameOver} newGame={this.newGame.bind(this)} />

                <Map gameMap={this.game.gameMap} playerPosition={this.game.playerPos} fogActive={this.state.fogActive} handleMove={this.game.handleMove.bind(this.game)} forceUpdate={this.forceUpdate.bind(this)} />

                <div class="text-xs-center m-t-2">
                    <button class="btn btn-primary m-r-1" onClick={this.newGame.bind(this)}>Restart</button>
                    <button class="btn btn-info" onClick={this.toggleFog.bind(this)}>Toggle fog</button>
                </div>
            </div>
        );
    }
}