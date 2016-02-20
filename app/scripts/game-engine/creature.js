export default class Creature {
    health;
    maxHealth;
    attackValue;

    constructor({ health, maxHealth = health, attack }) {
        this.health = health;
        this.maxHealth = maxHealth;
        this.attack = attack;

        if(this.health > this.maxHealth)
            this.health = this.maxHealth;
    }

    isAlive() {
        return this.health > 0;
    }

    attack(enemy) {
        if (!Creature.isCreature(enemy))
            throw 'Enemy is not a creature';

        if (!enemy.isAlive())
            throw 'Enemy is already dead';

        enemy.health -= this.attackValue;
    }

    heal(amount) {
        amount = Number(amount);
        if (!amount)
            throw 'Amount of health to be restored was not a number';

        this.health = Math.min(this.health + amount, this.maxHealth);
        return this.health;
    }

    setAttackValue(value) {
        value = Number(value);
        if (!value)
            throw 'New attack value to be set was not a number';

        this.attackValue = value;
    }

    static isCreature(creature) {
        return creature instanceof Creature;
    }
}