import GameConfig from './game-config';
import Creature from './creature';

export default class Player extends Creature {
    gold;
    experience;
    level;
    weapon;

    constructor(properties) {
        let { health, maxHealth, attack, gold, level, weapon } = properties;
        super({health, maxHealth, attack});        // TODO: check if it works and if not change to {health: health, maxHealth: maxHealth, attack: attack}

        this.gold = gold;
        this.level = level;
        this.setWeapon(weapon);
    }

    addExperience(amount) {
        this.experience += amount;

        let expNeeded = this.level * GameConfig.experiencePerLevelMultiplier;
        if (this.experience >= expNeeded) {
            this.level++;
            this.experience -= expNeeded;

            super.heal(Math.ceil(this.maxHealth / 2));
        }
    }

    setWeapon(weapon) {
        this.weapon = weapon;
        super.setAttackValue(weapon.attackValue);
    }
}