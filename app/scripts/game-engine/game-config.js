export default {
    experiencePerLevelMultiplier: 100,      // multiplier of how much experience player needs to level up
    experiencePerFloorMultiplier: 10,       // multiplier of how much experience player gets relative to the floor number
    startingWeapon: {
        name: 'Fist',
        attackValue: 5
    },
    map: {
        width: 80,
        height: 40
    },
    playerBaseStats: {
        health: 100,
        experience: 0,
        level: 1,
        gold: 0
    },
    roomsPerFloor: 20,
    roomSize: {
        minWidth: 5,
        maxWidth: 10,
        minHeight: 5,
        maxHeight: 10
    },
    enemiesPerFloor: 10,
    enemyHealthFloorMultiplier: 10,
    enemyAttackValueFloorMultiplier: 5,
    healthPotionsPerFloor: 3,
    healthPerPotionFloorMultiplier: 10,
    weapons: [
        {
            name: 'Dagger',
            attackValue: 10
        },
        {
            name: 'Rapier',
            attackValue: 15
        },
        {
            name: 'Sword',
            attackValue: 20
        },
        {
            name: 'Fire Sword',
            attackValue: 25
        }
    ],
    floorLimit: 4,
    goldPilesPerFloor: 5,
    goldPerPileFloorMultiplier: 5,
    randomVariance: 10  // percentage that stats may vary from their base value
}