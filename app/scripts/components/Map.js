import React from 'react';

export default class Map extends React.Component {
    constructor() {
        super();
    }

    render() {
        let map = this.props.gameMap;

        return (
            <h1>I'm a map!</h1>
        );
    }
}