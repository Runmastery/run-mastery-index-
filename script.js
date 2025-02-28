document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");

    let selectedDistance = "10K"; // Standardvärde för distans
    let selectedGender = "Men";
    let selectedAge = 25; // Standardvärde för ålder

    // Funktion för att skapa etiketter ovanför valen
    function createLabel(text, containerId) {
        const container = document.getElementById(containerId);
        const label = document.createElement("div");
        label.classList.add("picker-label");
        label.textContent = text;
        container.parentElement.insertBefore(label, container);
    }

    createLabel("GENDER", "genderPicker");
    createLabel("AGE", "agePicker");
    createLabel("DISTANCE", "distancePicker");

    // Funktion för att ställa in horisontell scroll med klickbara alternativ
    function setupHorizontalScroll(containerId, optionsArray) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";

        optionsArray.forEach(optionText => {
            const option = document.createElement("div");
            option.classList.add("option");
            option.dataset.value = optionText;
            option.textContent = optionText;
            container.appendChild(option);

            // Lägg till klickhändelse för att göra alternativet valbart
            option.addEventListener("click", () => {
                // Ta bort 'active'-klassen från alla alternativ
                container.querySelectorAll(".option").forEach(opt => opt.classList.remove("active"));
                // Lägg till 'active'-klassen till det klickade alternativet
                option.classList.add("active");

                // Uppdatera det valda värdet baserat på containerId
                if (containerId === "genderPicker") selectedGender = option.dataset.value;
                if (containerId === "distancePicker") selectedDistance = option.dataset.value;
                if (containerId === "agePicker") selectedAge = parseInt(option.dataset.value, 10);
            });
        });

        // Sätt första alternativet som aktivt som standard
        const firstOption = container.querySelector(".option");
        if (firstOption) {
            firstOption.classList.add("active");
            if (containerId === "genderPicker") selectedGender = firstOption.dataset.value;
            if (containerId === "distancePicker") selectedDistance = firstOption.dataset.value;
            if (containerId === "agePicker") selectedAge = parseInt(firstOption.dataset.value, 10);
        }
    }

    setupHorizontalScroll("genderPicker", ["Men", "Women"]);
    setupHorizontalScroll("distancePicker", ["5K", "10K", "Half Marathon", "Marathon"]);

    const ageArray = Array.from({ length: 71 }, (_, i) => (i + 15).toString());
    setupHorizontalScroll("agePicker", ageArray);

    // Funktion för att ställa in vertikal scroll för tidspickern med klickbara alternativ
    function setupTimePicker(pickerId, min, max) {
        const picker = document.getElementById(pickerId);
        picker.innerHTML = "";

        for (let i = min; i <= max; i++) {
            const option = document.createElement("div");
            option.classList.add("option");
            option.dataset.value = i;
            option.textContent = i;
            picker.appendChild(option);

            // Lägg till klickhändelse för att göra alternativet valbart
            option.addEventListener("click", () => {
                // Ta bort 'active'-klassen från alla alternativ
                picker.querySelectorAll(".option").forEach(opt => opt.classList.remove("active"));
                // Lägg till 'active'-klassen till det klickade alternativet
                option.classList.add("active");
            });
        }

        // Sätt första alternativet som aktivt som standard
        const firstOption = picker.querySelector(".option");
        if (firstOption) {
            firstOption.classList.add("active");
        }
    }

    setupTimePicker("hoursPicker", 0, 23);
    setupTimePicker("minutesPicker", 0, 59);
    setupTimePicker("secondsPicker", 0, 59);

    // Händelsehanterare för beräkningsknappen
    calculateButton.addEventListener("click", function () {
        const hours = parseInt(document.querySelector("#hoursPicker .option.active")?.dataset.value) || 0;
        const minutes = parseInt(document.querySelector("#minutesPicker .option.active")?.dataset.value) || 0;
        const seconds = parseInt(document.querySelector("#secondsPicker .option.active")?.dataset.value) || 0;

        if (!selectedDistance) {
            resultDiv.innerHTML = "<p style='color:red;'>Please select a distance.</p>";
            return;
        }

        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

        const selectedAgeGroup = getAgeGroup(selectedGender, selectedAge);

        const index = calculateRunMasteryIndex(selectedGender, selectedAgeGroup, selectedDistance, totalSeconds);

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
        return gender === "Men" ? "M85" : "W85";
    }

    // Dummy-funktion för att beräkna Run Mastery Index
    function calculateRunMasteryIndex(gender, ageGroup, distance, time
::contentReference[oaicite:0]{index=0}
 
