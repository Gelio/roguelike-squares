import React from 'react';

import GameConfig from '../game-engine/game-config';
import Tile from './tile';

export default class Map extends React.Component {
    constructor() {
        super();
    }

    getDisplayRows() {
        let map = this.props.gameMap,
            displayRows = [],
            tileWidth = 100/GameConfig.map.width + '%';

        for(let y = 0; y < map.height; y++) {
            let displayTiles = [];
            for(let x = 0; x < map.width; x++) {
                displayTiles.push(
                    <Tile x={x} y={y} key={x} color={map.getTile({x, y}).color} width={tileWidth} />
                );
            }
            displayRows.push(
                <div key={y} class="game-map-row">
                    {displayTiles}
                </div>
            );
        }

        return displayRows;
    }

    handleKeyDown(e) {
        console.log(e);
        let keyCode = e.which || e.keyCode;

        if(keyCode >= 37 && keyCode <= 40) {
            this.props.handleMove(keyCode - 37);
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div onKeyDown={this.handleKeyDown.bind(this)} tabIndex="0">
                {this.getDisplayRows()}
            </div>
        );
    }
}