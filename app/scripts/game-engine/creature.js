export default class Creature {
    health;
    maxHealth;
    attack;

    constructor(properties) {
        this.health = properties.health;
        this.maxHealth = properties.maxHealth;
        this.attack = properties.attack;
    }

    isAlive() {
        return this.health > 0;
    }

    attack(enemy) {
        if (!Creature.isCreature(enemy))
            throw 'Enemy is not a creature';

        if (!enemy.isAlive())
            throw 'Enemy is already dead';

        this.health -= enemy.attack;
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