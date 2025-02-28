@@ -6,7 +6,6 @@ document.addEventListener("DOMContentLoaded", function () {
    let selectedGender = "Men";
    let selectedAge = 25; // Default age

    /** --- Återställ rubrikerna över valen --- */
    function createLabel(text, containerId) {
        const container = document.getElementById(containerId);
        const label = document.createElement("div");
@@ -19,13 +18,12 @@ document.addEventListener("DOMContentLoaded", function () {
    createLabel("AGE", "agePicker");
    createLabel("DISTANCE", "distancePicker");

    /** --- Infinite Scroll för Gender, Age och Distance --- */
    function setupHorizontalScroll(containerId, optionsArray) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";

        
        optionsArray = [...optionsArray, ...optionsArray, ...optionsArray];

        
        optionsArray.forEach(optionText => {
            const option = document.createElement("div");
            option.classList.add("option");
@@ -35,7 +33,7 @@ document.addEventListener("DOMContentLoaded", function () {
        });

        container.scrollLeft = container.scrollWidth / 3;

        
        let isScrolling;
        container.addEventListener("scroll", function () {
            clearTimeout(isScrolling);
@@ -61,7 +59,7 @@ document.addEventListener("DOMContentLoaded", function () {
                        behavior: "smooth"
                    });
                });
            }, 50);
            }, 150); // Längre timeout för mjukare skroll
        });
    }

@@ -71,7 +69,6 @@ document.addEventListener("DOMContentLoaded", function () {
    const ageArray = Array.from({ length: 71 }, (_, i) => (i + 15).toString());
    setupHorizontalScroll("agePicker", ageArray);

    /** --- Vertikal scroll för Tidspickern (iOS-hjul) --- */
    function setupTimePicker(pickerId, min, max) {
        const picker = document.getElementById(pickerId);
        picker.innerHTML = "";
@@ -106,76 +103,11 @@ document.addEventListener("DOMContentLoaded", function () {
                        behavior: "smooth"
                    });
                });
            }, 50);
        });

        let startY, scrollStart;
        picker.addEventListener("touchstart", function (e) {
            startY = e.touches[0].clientY;
            scrollStart = picker.scrollTop;
        });

        picker.addEventListener("touchmove", function (e) {
            let deltaY = e.touches[0].clientY - startY;
            picker.scrollTop = scrollStart - deltaY;
        });

        picker.addEventListener("touchend", function () {
            let options = picker.querySelectorAll(".option");
            let optionHeight = options[0].offsetHeight;
            let centerIndex = Math.round(picker.scrollTop / optionHeight);

            requestAnimationFrame(() => {
                picker.scrollTo({
                    top: centerIndex * optionHeight,
                    behavior: "smooth"
                });
            });
            }, 200);
        });
    }

    setupTimePicker("hoursPicker", 0, 23);
    setupTimePicker("minutesPicker", 0, 59);
    setupTimePicker("secondsPicker", 0, 59);

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
