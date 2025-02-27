function calculateRunMasteryIndex(gender, ageGroup, distance, userTime) {
    console.log("Calculating Index for:", gender, ageGroup, distance, userTime); // Debug-logg

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

    console.log("World Record:", worldRecord, "| Average Time:", averageTime, "| User Time:", userTime); // Debug-logg

    if (userTime < worldRecord) {
        console.warn("User time is faster than world record!", userTime, "<", worldRecord);
        return "Error: Your time is faster than the world record!";
    }

    if (userTime === worldRecord) {
        return "100.00 (World Record Performance!)";
    }

    // Säkerställ att worldRecord och averageTime inte är samma (division med noll)
    if (worldRecord === averageTime) {
        console.error("Error: World record and average time are equal. Calculation not possible.");
        return "Error: Calculation issue.";
    }

    // Run Mastery Index Formel
    const index = 50 + 50 * ((worldRecord - userTime) / (worldRecord - averageTime));

    console.log("Calculated Index:", index); // Debug-logg

    return Math.round(index * 100) / 100; // Avrundar till två decimaler
}
