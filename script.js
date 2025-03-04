document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");

    let selectedDistance = "Half Marathon"; // Förinställt på Half Marathon
    let selectedGender = "Men";
    let selectedAge = 50; // Förinställt på 50 år

    // Generera åldrar 15-85 i agePicker och förinställ 50
    const agePicker = document.getElementById("agePicker");
    if (agePicker) {
        for (let i = 15; i <= 85; i++) {
            const ageOption = document.createElement("div");
            ageOption.classList.add("option");
            ageOption.dataset.value = i;
            ageOption.textContent = i;

            // Markera 50 som aktiv från start
            if (i === 50) {
                ageOption.classList.add("active");
            }

            ageOption.addEventListener("click", function() {
                document.querySelectorAll("#agePicker .option").forEach(opt => opt.classList.remove("active"));
                this.classList.add("active");
                selectedAge = parseInt(this.dataset.value);
            });

            agePicker.appendChild(ageOption);
        }
    }

    document.querySelectorAll("#genderPicker .option").forEach(option => {
        option.addEventListener("click", function() {
            document.querySelectorAll("#genderPicker .option").forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");
            selectedGender = this.dataset.value;
        });
    });

    document.querySelectorAll("#distancePicker .option").forEach(option => {
        // Markera "Half Marathon" som aktiv från start
        if (option.dataset.value === "Half Marathon") {
            option.classList.add("active");
        }

        option.addEventListener("click", function() {
            document.querySelectorAll("#distancePicker .option").forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");
            selectedDistance = this.dataset.value;
        });
    });

    // Dynamiskt generera tid för timmar, minuter, sekunder (Förinställt 1:45:30)
    function createTimePicker(id, min, max, defaultValue) {
        const pickerElement = document.getElementById(id);
        if (pickerElement) {
            for (let i = min; i <= max; i++) {
                const option = document.createElement("div");
                option.classList.add("option");
                option.dataset.value = i;
                option.textContent = i;

                // Markera förvalt värde
                if (i === defaultValue) {
                    option.classList.add("active");
                }

                option.addEventListener("click", function() {
                    document.querySelectorAll(`#${id} .option`).forEach(opt => opt.classList.remove("active"));
                    this.classList.add("active");
                });

                pickerElement.appendChild(option);
            }
        }
    }

    createTimePicker("hoursPicker", 0, 23, 1); // Förvalt 1h
    createTimePicker("minutesPicker", 0, 59, 45); // Förvalt 45m
    createTimePicker("secondsPicker", 0, 59, 30); // Förvalt 30s

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
