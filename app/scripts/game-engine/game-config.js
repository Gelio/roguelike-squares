export default {
    experiencePerLevelMultiplier: 100,      // multiplier of how much experience player needs to level up
    experiencePerFloorMultiplier: 10,       // multiplier of how much experience player gets relative to the floor number
    startingWeapon: {
        name: 'Fist',
        attackValue: 5
    },
    map: {
        width: 50,
        height: 30
    },
    playerBaseStats: {
        health: 100,
        experience: 0,
        level: 1,
        gold: 0
    },
    roomsPerFloor: 1,
    roomSize: {
        minWidth: 3,
        maxWidth: 10,
        minHeight: 3,
        maxHeight: 10
    }
}