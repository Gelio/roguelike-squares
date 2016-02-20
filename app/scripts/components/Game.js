import React from 'react';

import GameEngine from '../game-engine/game';

export default class Game extends React.Component {
    constructor() {
        super();

        this.game = new GameEngine();
    }

    render() {

    }
}