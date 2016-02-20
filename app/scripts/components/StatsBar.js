import React from 'react';

export default class StatsBar extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { player, floor, gameOver } = this.props;

        if(gameOver)
            return (
                <div class="game-stats">
                    <div>YOU {gameOver === 1 ? 'WON' : 'LOST'}!</div>
                    <button onClick={this.props.newGame} class="btn btn-primary m-b-1">Click here to start a new game.</button>
                </div>
            );

        return (
            <div class="game-stats">
                <div>Health: {player.health} / {player.maxHealth}</div>
                <div>Level: {player.level}</div>
                <div>Gold: {player.gold}</div>
                <div>Experience: {player.experience} / {player.experienceNeeded}</div>
                <div>Weapon: {player.weapon.name} ({player.weapon.attackValue} attack)</div>
                <div>Floor: {floor}</div>
            </div>
        );
    }
}
