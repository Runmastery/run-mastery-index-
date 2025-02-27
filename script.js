document.addEventListener("DOMContentLoaded", function() {
    const ageInput = document.getElementById("age");
    const ageValue = document.getElementById("age-value");
    const calculateButton = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");

    let selectedDistance = null;
    let selectedGender = "Men";
    let selectedAgeGroup = "M1-34"; // Default age group

    // Uppdatera åldervärde och åldersgrupp
    ageInput.addEventListener("input", function() {
        ageValue.textContent = ageInput.value;
        selectedAgeGroup = getAgeGroup(selectedGender, ageInput.value);
    });

    // Välj kön
    document.getElementById("maleBtn").addEventListener("click", function() {
        selectedGender = "Men";
        selectedAgeGroup = getAgeGroup(selectedGender, ageInput.value);
        highlightSelectedButton(this, document.querySelectorAll(".gender-btn"));
    });

    document.getElementById("femaleBtn").addEventListener("click", function() {
        selectedGender = "Women";
        selectedAgeGroup = getAgeGroup(selectedGender, ageInput.value);
        highlightSelectedButton(this, document.querySelectorAll(".gender-btn"));
    });

    // Välj distans
    document.querySelectorAll(".distance-btn").forEach(button => {
        button.addEventListener("click", function() {
            selectedDistance = this.getAttribute("data-distance");
            highlightSelectedButton(this, document.querySelectorAll(".distance-btn"));
            console.log("Selected distance:", selectedDistance); // Debugging
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
        console.log("Total time in seconds:", totalSeconds); // Debug-logg

        const index = calculateRunMasteryIndex(selectedGender, selectedAgeGroup, selectedDistance, totalSeconds);
        console.log("Calculated Index:", index); // Debug-logg

        resultDiv.innerHTML = `<p>Your Run Mastery Index: <strong>${index}</strong></p>`;
    });

    // Funktion för att bestämma åldersgrupp baserat på inmatad ålder
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

    // Funktion för att markera vald knapp
    function highlightSelectedButton(selectedButton, buttonGroup) {
        buttonGroup.forEach(button => button.classList.remove("active"));
        selectedButton.classList.add("active");
    }
});
