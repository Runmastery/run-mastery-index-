document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");

    let selectedDistance = "10000m"; 
    let selectedGender = "Men";
    let selectedAge = 25;

    document.querySelectorAll("#genderPicker .option").forEach(option => {
        option.addEventListener("click", function() {
            document.querySelectorAll("#genderPicker .option").forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");
            selectedGender = this.dataset.value;
        });
    });

    document.querySelectorAll("#distancePicker .option").forEach(option => {
        option.addEventListener("click", function() {
            document.querySelectorAll("#distancePicker .option").forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");
            selectedDistance = this.dataset.value;
        });
    });

    // Dynamiskt generera tid för timmar, minuter, sekunder
    function createTimePicker(id, min, max) {
        const pickerElement = document.getElementById(id);
        if (pickerElement) {
            for (let i = min; i <= max; i++) {
                const option = document.createElement("div");
                option.classList.add("option");
                option.dataset.value = i;
                option.textContent = i;
                option.addEventListener("click", function() {
                    document.querySelectorAll(`#${id} .option`).forEach(opt => opt.classList.remove("active"));
                    this.classList.add("active");
                });
                pickerElement.appendChild(option);
            }
        }
    }

    createTimePicker("hoursPicker", 0, 23);
    createTimePicker("minutesPicker", 0, 59);
    createTimePicker("secondsPicker", 0, 59);

    calculateButton.addEventListener("click", function() {
        const hours = parseInt(document.querySelector("#hoursPicker .option.active")?.dataset.value) || 0;
        const minutes = parseInt(document.querySelector("#minutesPicker .option.active")?.dataset.value) || 0;
        const seconds = parseInt(document.querySelector("#secondsPicker .option.active")?.dataset.value) || 0;

        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

        if (!selectedDistance) {
            resultDiv.innerHTML = "<p style='color:red;'>Please select a distance.</p>";
            return;
        }

        const selectedAgeGroup = getAgeGroup(selectedGender, selectedAge);
        const index = calculateRunMasteryIndex(selectedGender, selectedAgeGroup, selectedDistance, totalSeconds);

        resultDiv.innerHTML = `<p>Your Run Mastery Index: <strong>${index}</strong></p>`;
    });

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
        return gender === "Men" ? "M85" : "W85";
    }

    function calculateRunMasteryIndex(gender, ageGroup, distance, userTime) {
        const worldRecord = running_records[gender][ageGroup][distance];
        const averageTime = 1500; // Exempelvärde, du kan hämta det riktiga från din snittdata

        return 50 + 50 * ((worldRecord - userTime) / (worldRecord - averageTime));
    }
});
