import GameConfig from './game-config';
import Creature from './creature';

export default class Player extends Creature {
    gold;
    experience;
    level;
    weapon;

    constructor({health, maxHealth, attack, gold, level, weapon}) {
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
        weapon.attackValue = Number(weapon.attackValue);

        if (!weapon.attackValue)
            throw 'Weapon\'s attack value was not a number';
        if (!weapon.name)
            throw 'Weapon did not have a name';

        this.weapon = weapon;
        super.setAttackValue(weapon.attackValue);
    }

    addGold(amount) {
        amount = Number(amount);
        if (!amount)
            throw 'Amount of gold to add was not a number';

        this.gold += amount;
    }
}