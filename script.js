document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");

    let selectedDistance = "10000m"; // Default distance
    let selectedGender = "Men";
    let selectedAge = 25; // Default age

    // Hantera val av kön
    document.querySelectorAll("#genderPicker .option").forEach(option => {
        option.addEventListener("click", function() {
            document.querySelectorAll("#genderPicker .option").forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");
            selectedGender = this.dataset.value;
            console.log("Selected Gender:", selectedGender);
        });
    });

    // Hantera val av ålder
    document.getElementById("agePicker").addEventListener("input", function() {
        selectedAge = parseInt(this.value);
        console.log("Selected Age:", selectedAge);
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

    // Hantera val av tid (scroll-pickers)
    function getTimeFromPicker(pickerId) {
        return parseInt(document.querySelector(`#${pickerId} .option.active`)?.dataset.value) || 0;
    }

    // Beräkna-knappen
    calculateButton.addEventListener("click", function() {
        console.log("Calculate button clicked!"); // Debug-logg

        const hours = getTimeFromPicker("hoursPicker");
        const minutes = getTimeFromPicker("minutesPicker");
        const seconds = getTimeFromPicker("secondsPicker");

        if (!selectedDistance) {
            resultDiv.innerHTML = "<p style='color:red;'>Please select a distance.</p>";
            return;
        }

        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        console.log("Total time in seconds:", totalSeconds);

        const selectedAgeGroup = getAgeGroup(selectedGender, selectedAge);
        console.log("Selected Age Group:", selectedAgeGroup);

        const index = calculateRunMasteryIndex(selectedGender, selectedAgeGroup, selectedDistance, totalSeconds);
        console.log("Calculated Index:", index);

        resultDiv.innerHTML = `<p>Your Run Mastery Index: <strong>${index}</strong></p>`;
    });

    // Funktion för att bestämma åldersgrupp baserat på ålder
    function getAgeGroup(gender, age) {
        if (age < 35) return gender === "Men" ? "M1-34" : "W1-34";
        if (age < 40) return gender === "Men" ? "M35" : "W35";
        if (age < 45) return gender === "Men" ? "M40" : "W40";
        if (age < 50) return gender === "Men" ? "M45" : "W45";
        if (age < 55) return gender === "Men" ? "M50" : "W50";
        if (age < 60) return gender === "Men" ? "M55" : "W55";
        if (age < 65) return gender === "Men" ? "M60" : "W60";
        if (age < 70) return gender === "Men" ? "M65" : "W65";
        if (age < 75) return gender === "Men" ? "M70" : "W70";
        if (age < 80) return gender === "Men" ? "M75" : "W75";
        if (age < 85) return gender === "Men" ? "M80" : "W80";
        return gender === "Men" ? "M85" : "W85"; // Default för 85+
    }
});
