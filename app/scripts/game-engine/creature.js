export default class Creature {
    health;
    maxHealth;
    attack;

    constructor({ health, maxHealth, attack }) {
        this.health = health;
        this.maxHealth = maxHealth;
        this.attack = attack;
    }

    isAlive() {
        return this.health > 0;
    }

    attack(enemy) {
        if (!Creature.isCreature(enemy))
            throw 'Enemy is not a creature';

        if (!enemy.isAlive())
            throw 'Enemy is already dead';

        enemy.health -= this.attack;
    }

    heal(amount) {
        this.health += Math.min(amount, this.maxHealth);
        return this.health;
    }

    setAttackValue(value) {
        this.attack = value;
    }

    static isCreature(creature) {
        return creature instanceof Creature;
    }
}