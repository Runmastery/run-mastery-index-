function calculateRunMasteryIndex(gender, ageGroup, distance, userTime) {
    const worldRecord = runningRecords[gender][ageGroup][distance];
    const averageTime = averageTimes[gender][distance];

    if (!worldRecord || !averageTime) {
        return "Invalid input"; // Om det saknas data
    }

    const index = 50 + 50 * ((worldRecord - userTime) / (worldRecord - averageTime));
    return Math.round(index * 100) / 100; // Avrundar till två decimaler
}
