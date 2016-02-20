import React from 'react';

export default class Tile extends React.Component {
    constructor() {
        super();
    }

    render() {
        let style = {
            width: this.props.width,
            backgroundColor: this.props.color
        };

        return (
            <div class="game-map-tile" style={style} />
        );
    }
}