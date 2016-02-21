/// <reference path="interfaces.ts" />

export default class Creature implements CreatureClass {
    health: number;
    maxHealth: number;
    attackValue: number;

    constructor({ health, maxHealth, attack }: CreatureParameters) {
        if(!maxHealth)
            maxHealth = health;

        this.health = health;
        this.maxHealth = maxHealth;
        this.attackValue = attack;

        if(this.health > this.maxHealth)
            this.health = this.maxHealth;
    }

    isAlive(): boolean {
        return this.health > 0;
    }

    attack(enemy: Creature): void {
        /*if (!Creature.isCreature(enemy))
            throw 'Enemy is not a creature';*/

        if (!enemy.isAlive())
            throw 'Enemy is already dead';

        enemy.health -= this.attackValue;
    }

    heal(amount: number): number {
        /*amount = Number(amount);
        if (!amount)
            throw 'Amount of health to be restored was not a number';*/

        this.health = Math.min(this.health + amount, this.maxHealth);
        return this.health;
    }

    setAttackValue(value: number): void {
        /*value = Number(value);
        if (!value)
            throw 'New attack value to be set was not a number';*/

        this.attackValue = value;
    }

    static isCreature(creature: any): boolean {
        return creature instanceof Creature;
    }
}