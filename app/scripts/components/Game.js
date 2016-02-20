import React from 'react';

import GameEngine from '../game-engine/game';

import Map from './Map';

export default class Game extends React.Component {
    constructor() {
        super();

        this.game = new GameEngine();
    }

    render() {
        return (
            <Map gameMap={this.game.map} />
        );
    }
}