document.addEventListener("DOMContentLoaded", function() {
    const ageInput = document.getElementById("age");
    const ageValue = document.getElementById("age-value");
    const distanceButtons = document.querySelectorAll(".distance-btn");
    const calculateButton = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");

    let selectedDistance = null;
    let selectedGender = "Men"; // Default
    let selectedAgeGroup = "M40"; // Default

    // Uppdatera åldervärde
    ageInput.addEventListener("input", function() {
        ageValue.textContent = ageInput.value;
        selectedAgeGroup = getAgeGroup(selectedGender, ageInput.value);
    });

    // Könsväljare
    document.getElementById("maleBtn").addEventListener("click", function() {
        selectedGender = "Men";
        highlightSelectedButton("maleBtn", "femaleBtn");
    });

    document.getElementById("femaleBtn").addEventListener("click", function() {
        selectedGender = "Women";
        highlightSelectedButton("femaleBtn", "maleBtn");
    });

    // Distansväljare
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

    // Funktion för att markera vald knapp
    function highlightSelectedButton(selected, group) {
        if (Array.isArray(group)) {
            group.forEach(btn => btn.style.background = "transparent");
        } else {
            document.getElementById(group).style.background = "transparent";
        }
        if (typeof selected === "string") {
            document.getElementById(selected).style.background = "#FBCA61";
        } else {
            selected.style.background = "#FBCA61";
        }
    }

    // Funktion för att bestämma åldersgrupp baserat på inmatad ålder
    function getAgeGroup(gender, age) {
        if (age < 35) return gender === "Men" ? "M1-34" : "W1-34";
        if (age < 40) return gender === "Men" ? "M35" : "W35";
        if (age < 45) return gender === "Men" ? "M40" : "W40";
        if (age < 50) return gender === "Men" ? "M45" : "W45";
        if (age < 55) return gender === "Men" ? "M50" : "W50";
        return gender === "Men" ? "M55" : "W55"; // Default om äldre än 55
    }
});
