import GameConfig from './game-config';
import Creature from './creature';

export default class Player extends Creature {
    gold;
    experience;
    level;
    weapon;

    constructor({health, gold, level, weapon = GameConfig.startingWeapon, experience}) {
        super({health});

        this.experience = experience;
        this.gold = gold;
        this.level = level;
        this.setWeapon(weapon);
    }

    addExperience(amount) {
        amount = Number(amount);
        if (!amount)
            throw 'Amount of experience to be added was not a number';

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

    static isPlayer(player) {
        return player instanceof Player;
    }
}