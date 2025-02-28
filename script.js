document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");

    let selectedDistance = "10000m"; // Default distance
    let selectedGender = "Men";
    let selectedAge = 25; // Default age

    function createInfiniteScroll(elementId, values) {
        const picker = document.getElementById(elementId);
        if (!picker) return;

        // Skapa en loop av värden genom att duplicera listan
        const infiniteValues = [...values, ...values, ...values];
        infiniteValues.forEach(value => {
            const option = document.createElement("div");
            option.classList.add("option");
            option.dataset.value = value;
            option.textContent = value;
            picker.appendChild(option);
        });

        picker.addEventListener("scroll", function() {
            const options = picker.children;
            const midIndex = Math.floor(options.length / 3); // Hitta mitten av den loopade listan
            const selectedIndex = Math.round(picker.scrollTop / options[0].offsetHeight);
            
            if (selectedIndex < midIndex / 2) {
                picker.scrollTop += options[midIndex].offsetTop;
            } else if (selectedIndex > midIndex * 1.5) {
                picker.scrollTop -= options[midIndex].offsetTop;
            }

            // Markera det valda värdet
            Array.from(options).forEach(opt => opt.classList.remove("active"));
            options[selectedIndex].classList.add("active");

            if (elementId === "genderPicker") {
                selectedGender = options[selectedIndex].dataset.value;
            } else if (elementId === "distancePicker") {
                selectedDistance = options[selectedIndex].dataset.value;
            }
        });

        picker.scrollTop = picker.children[Math.floor(picker.children.length / 3)].offsetTop;
    }

    // Initiera gender och distance med infinite scroll
    createInfiniteScroll("genderPicker", ["Men", "Women"]);
    createInfiniteScroll("distancePicker", ["5K", "10K", "Half Marathon", "Marathon"]);

    // Dynamiskt generera tid för timmar, minuter och sekunder
    function createTimePicker(elementId, min, max) {
        const picker = document.getElementById(elementId);
        if (!picker) return;

        for (let i = min; i <= max; i++) {
            const option = document.createElement("div");
            option.classList.add("option");
            option.dataset.value = i;
            option.textContent = i;
            picker.appendChild(option);
        }

        picker.addEventListener("scroll", function() {
            const options = picker.children;
            const selectedIndex = Math.round(picker.scrollTop / options[0].offsetHeight);
            
            Array.from(options).forEach(opt => opt.classList.remove("active"));
            options[selectedIndex].classList.add("active");
        });
    }

    createTimePicker("hoursPicker", 0, 23);
    createTimePicker("minutesPicker", 0, 59);
    createTimePicker("secondsPicker", 0, 59);

    // Beräkna-knappen
    calculateButton.addEventListener("click", function() {
        console.log("Calculate button clicked!"); // Debug-logg

        const hours = parseInt(document.querySelector("#hoursPicker .option.active")?.dataset.value) || 0;
        const minutes = parseInt(document.querySelector("#minutesPicker .option.active")?.dataset.value) || 0;
        const seconds = parseInt(document.querySelector("#secondsPicker .option.active")?.dataset.value) || 0;

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
