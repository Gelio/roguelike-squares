import TYPE from './types';

let colors = {};
colors[TYPE.WALL] = 'black';
colors[TYPE.EMPTY] = 'white';
colors[TYPE.PLAYER] = 'green';
colors[TYPE.CREATURE] = 'red';
colors[TYPE.WEAPON] = 'blue';
colors[TYPE.GOLD] = 'gold';
colors[TYPE.TRAPDOOR] = 'grey';
colors[TYPE.HEALTH_POTION] = 'pink';

/*colors.set(TYPE.WALL, 'black');
colors.set(TYPE.EMPTY, 'white');
colors.set(TYPE.PLAYER, 'green');
colors.set(TYPE.CREATURE, 'red');
colors.set(TYPE.WEAPON, 'blue');
colors.set(TYPE.GOLD, 'gold');
colors.set(TYPE.TRAPDOOR, 'grey');
colors.set(TYPE.HEALTH_POTION, 'pink');*/

export default colors;