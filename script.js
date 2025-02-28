document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");

    let selectedDistance = "10000m"; // Default distance
    let selectedGender = "Men";
    let selectedAge = 25; // Default age

    /** --- Infinite Scroll Funktion för Gender & Distance --- */
    function setupInfiniteScroll(containerId, optionsArray) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";

        // Skapa en loopande lista
        optionsArray = [...optionsArray, ...optionsArray, ...optionsArray];

        optionsArray.forEach((optionText) => {
            const option = document.createElement("div");
            option.classList.add("option");
            option.dataset.value = optionText;
            option.textContent = optionText;
            option.addEventListener("click", function () {
                document.querySelectorAll(`#${containerId} .option`).forEach(opt => opt.classList.remove("active"));
                this.classList.add("active");
                if (containerId === "genderPicker") selectedGender = this.dataset.value;
                if (containerId === "distancePicker") selectedDistance = this.dataset.value;
                console.log(`Selected ${containerId}:`, this.dataset.value);
            });
            container.appendChild(option);
        });

        container.scrollLeft = container.scrollWidth / 3; // Start i mitten
    }

    setupInfiniteScroll("genderPicker", ["Men", "Women"]);
    setupInfiniteScroll("distancePicker", ["5K", "10K", "Half Marathon", "Marathon"]);

    /** --- Hantera val av ålder --- */
    const agePicker = document.getElementById("agePicker");
    if (agePicker) {
        agePicker.innerHTML = "";
        for (let i = 15; i <= 85; i++) {
            const ageOption = document.createElement("div");
            ageOption.classList.add("option");
            ageOption.dataset.value = i;
            ageOption.textContent = i;
            ageOption.addEventListener("click", function () {
                document.querySelectorAll("#agePicker .option").forEach(opt => opt.classList.remove("active"));
                this.classList.add("active");
                selectedAge = this.dataset.value;
                console.log("Selected Age:", selectedAge);
            });
            agePicker.appendChild(ageOption);
        }
    }

    /** --- Dynamisk scroll för Time (Fixat studseffekt & centrering) --- */
    const timePickers = document.querySelectorAll(".time-picker");

    timePickers.forEach(picker => {
        picker.addEventListener("scroll", function () {
            let options = picker.querySelectorAll(".option");
            let scrollTop = picker.scrollTop;
            let optionHeight = options[0].offsetHeight;
            let centerIndex = Math.round(scrollTop / optionHeight);

            options.forEach((option, index) => {
                option.classList.remove("active");
                if (index === centerIndex) {
                    option.classList.add("active");
                }
            });

            // Snäpp tillbaka till exakt rätt position
            setTimeout(() => {
                picker.scrollTo({
                    top: centerIndex * optionHeight,
                    behavior: "smooth"
                });
            }, 100);
        });

        // Förhindra att tidspickern kan dras utanför sin position
        picker.addEventListener("mousedown", function (event) {
            event.preventDefault();
        });
    });

    /** --- Beräkna-knappen --- */
    calculateButton.addEventListener("click", function () {
        console.log("Calculate button clicked!");

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

    /** --- Funktion för att bestämma åldersgrupp baserat på ålder --- */
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
});
