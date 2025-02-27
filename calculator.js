function calculateRunMasteryIndex(gender, ageGroup, distance, userTime) {
    // Kontrollera om datan existerar
    if (!runningRecords[gender] || !runningRecords[gender][ageGroup] || !runningRecords[gender][ageGroup][distance]) {
        console.error("Missing record data for:", gender, ageGroup, distance);
        return "Invalid input: No record data found.";
    }
    if (!averageTimes[gender] || !averageTimes[gender][distance]) {
        console.error("Missing average time data for:", gender, distance);
        return "Invalid input: No average time data found.";
    }

    // Säkerställ att userTime är ett giltigt nummer
    if (isNaN(userTime) || userTime <= 0) {
        console.error("Invalid user time:", userTime);
        return "Error: Please enter a valid time.";
    }

    const worldRecord = runningRecords[gender][ageGroup][distance];
    const averageTime = averageTimes[gender][distance];

    if (userTime < worldRecord) {
        console.warn("User time is faster than world record!", userTime, "<", worldRecord);
        return "Error: Your time is faster than the world record!";
    }

    if (userTime === worldRecord) {
        return "100.00 (World Record Performance!)";
    }

    // Run Mastery Index Formel
    const index = 50 + 50 * ((worldRecord - userTime) / (worldRecord - averageTime));

    return Math.round(index * 100) / 100; // Avrundar till två decimaler
}
