import React from 'react';

import GameEngine from '../game-engine/game';

import Map from './Map';
import StatsBar from './StatsBar';

export default class Game extends React.Component {
    constructor() {
        super();

        this.game = new GameEngine();
    }

    render() {
        return (
            <div>
                <StatsBar player={this.game.player} floor={this.game.floor} />

                <Map gameMap={this.game.gameMap} handleMove={this.game.handleMove.bind(this.game)} forceUpdate={this.forceUpdate.bind(this)} />
            </div>
        );
    }
}