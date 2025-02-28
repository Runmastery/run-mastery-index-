document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");

    let selectedDistance = "10000m"; // Default distance
    let selectedGender = "Men";
    let selectedAgeGroup = "M1-34"; // Default age group

    // Hantera val av kön
    document.querySelectorAll("#genderPicker .option").forEach(option => {
        option.addEventListener("click", function() {
            document.querySelectorAll("#genderPicker .option").forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");
            selectedGender = this.dataset.value;
            selectedAgeGroup = getAgeGroup(selectedGender, selectedAgeGroup);
            console.log("Selected Gender:", selectedGender);
        });
    });

    // Hantera val av åldersgrupp
    document.querySelectorAll("#agePicker .option").forEach(option => {
        option.addEventListener("click", function() {
            document.querySelectorAll("#agePicker .option").forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");
            selectedAgeGroup = this.dataset.value;
            console.log("Selected Age Group:", selectedAgeGroup);
        });
    });

    // Hantera val av distans
    document.querySelectorAll("#distancePicker .option").forEach(option => {
        option.addEventListener("click", function() {
            document.querySelectorAll("#distancePicker .option").forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");
            selectedDistance = this.dataset.value;
            console.log("Selected Distance:", selectedDistance);
        });
    });

    // Beräkna-knappen
    calculateButton.addEventListener("click", function() {
        console.log("Calculate button clicked!"); // Debug-logg

        const hours = parseInt(document.getElementById("hours").value) || 0;
        const minutes = parseInt(document.getElementById("minutes").value) || 0;
        const seconds = parseInt(document.getElementById("seconds").value) || 0;

        if (!selectedDistance) {
            resultDiv.innerHTML = "<p style='color:red;'>Please select a distance.</p>";
            return;
        }

        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        console.log("Total time in seconds:", totalSeconds);

        const index = calculateRunMasteryIndex(selectedGender, selectedAgeGroup, selectedDistance, totalSeconds);
        console.log("Calculated Index:", index);

        resultDiv.innerHTML = `<p>Your Run Mastery Index: <strong>${index}</strong></p>`;
    });

    // Funktion för att bestämma åldersgrupp baserat på inmatad ålder
    function getAgeGroup(gender, ageGroup) {
        if (ageGroup === "1-34") return gender === "Men" ? "M1-34" : "W1-34";
        if (ageGroup === "M35") return "M35";
        if (ageGroup === "M40") return "M40";
        if (ageGroup === "M45") return "M45";
        if (ageGroup === "M50") return "M50";
        if (ageGroup === "M55") return "M55";
        if (ageGroup === "M60") return "M60";
        if (ageGroup === "M65") return "M65";
        if (ageGroup === "M70") return "M70";
        if (ageGroup === "M75") return "M75";
        if (ageGroup === "M80") return "M80";
        return "M85"; // Default för 85+
    }
});
