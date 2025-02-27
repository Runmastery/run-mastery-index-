function calculateRunMasteryIndex(gender, ageGroup, distance, userTime) {
    // Kontrollera om datan existerar
    if (!runningRecords[gender] || !runningRecords[gender][ageGroup] || !runningRecords[gender][ageGroup][distance]) {
        return "Invalid input: No record data found.";
    }
    if (!averageTimes[gender] || !averageTimes[gender][distance]) {
        return "Invalid input: No average time data found.";
    }

    const worldRecord = runningRecords[gender][ageGroup][distance];
    const averageTime = averageTimes[gender][distance];

    if (userTime < worldRecord) {
        return "Error: Your time is faster than the world record!";
    }

    // Run Mastery Index Formel
    const index = 50 + 50 * ((worldRecord - userTime) / (worldRecord - averageTime));

    return Math.round(index * 100) / 100; // Avrundar till två decimaler
}
