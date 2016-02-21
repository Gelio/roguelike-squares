interface CreatureParameters {
    health: number;
    maxHealth?: number;
    attack: number;
}

interface CreatureClass {
    health: number;
    maxHealth: number;
    attackValue: number;
}

interface Weapon {
    name: string;
    attackValue: number;
}

interface PlayerParameters {
    health: number;
    gold: number;
    level: number;
    weapon?: Weapon
    experience: number;
}

interface PlayerClass {
    gold: number;
    experience: number;
    level: number;
    weapon: Weapon;
    experienceNeeded: number;
}