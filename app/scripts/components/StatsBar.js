import React from 'react';

export default class StatsBar extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { player, floor} = this.props;

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
