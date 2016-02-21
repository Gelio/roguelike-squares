import TYPE from "./types";
export interface CreatureParameters {
    health: number;
    maxHealth?: number;
    attack: number;
}

export interface CreatureClass {
    health: number;
    maxHealth: number;
    attackValue: number;
}

export interface Weapon {
    name: string;
    attackValue: number;
}

export interface PlayerParameters {
    health: number;
    gold: number;
    level: number;
    weapon?: Weapon
    experience: number;
}

export interface PlayerClass {
    gold: number;
    experience: number;
    level: number;
    weapon: Weapon;
    experienceNeeded: number;
}

export interface TileParameters {
    x: number,
    y: number,
    type?: TYPE,
    content?: any
}

export interface Position {
    x: number,
    y: number
}