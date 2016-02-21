import TYPE from './types';

let colors = new Map();

colors.set(TYPE.WALL, 'black');
colors.set(TYPE.EMPTY, 'white');
colors.set(TYPE.PLAYER, 'green');
colors.set(TYPE.CREATURE, 'red');
colors.set(TYPE.WEAPON, 'blue');
colors.set(TYPE.GOLD, 'gold');
colors.set(TYPE.TRAPDOOR, 'grey');
colors.set(TYPE.HEALTH_POTION, 'pink');

export default colors;