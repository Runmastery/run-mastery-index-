document.addEventListener("DOMContentLoaded", function() {
    const ageInput = document.getElementById("age");
    const ageValue = document.getElementById("age-value");
    const distanceButtons = document.querySelectorAll(".distance-btn");
    const calculateButton = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");

    let selectedDistance = null;
    let selectedGender = "Men";
    let selectedAgeGroup = "M1-34"; // Default för män

    // Uppdatera åldervärde och åldersgrupp
    ageInput.addEventListener("input", function() {
        ageValue.textContent = ageInput.value;
        selectedAgeGroup = getAgeGroup(selectedGender, ageInput.value);
    });

    // Välj kön
    document.getElementById("maleBtn").addEventListener("click", function() {
        selectedGender = "Men";
        selectedAgeGroup = getAgeGroup(selectedGender, ageInput.value);
        highlightSelectedButton("maleBtn", "femaleBtn");
    });

    document.getElementById("femaleBtn").addEventListener("click", function() {
        selectedGender = "Women";
        selectedAgeGroup = getAgeGroup(selectedGender, ageInput.value);
        highlightSelectedButton("femaleBtn", "maleBtn");
    });

    // Välj distans
    distanceButtons.forEach(button => {
        button.addEventListener("click", function() {
            selectedDistance = this.dataset.distance;
            highlightSelectedButton(this, distanceButtons);
        });
    });

    // Beräkna-knappen
    calculateButton.addEventListener("click", function() {
        const hours = parseInt(document.getElementById("hours").value) || 0;
        const minutes = parseInt(document.getElementById("minutes").value) || 0;
        const seconds = parseInt(document.getElementById("seconds").value) || 0;

        if (!selectedDistance) {
            resultDiv.innerHTML = "<p style='color:red;'>Please select a distance.</p>";
            return;
        }

        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        const index = calculateRunMasteryIndex(selectedGender, selectedAgeGroup, selectedDistance, totalSeconds);

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
});
