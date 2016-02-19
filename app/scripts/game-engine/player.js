import Creature from './creature';

export default class Player extends Creature {
    gold;
    experience;
    level;
    weapon;

    constructor(properties) {
        super({health: properties.health, attack: properties.attack});
    }

    addExperience(amount) {
        this.experience += amount;

        // Check is player leveled up and distribute experience, add a level, heal up
    }
}