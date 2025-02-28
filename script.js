document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculateBtn");
    const resultDiv = document.getElementById("result");

    let selectedDistance = "10K"; // Default distance
    let selectedGender = "Men";
    let selectedAge = 25; // Default age

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

    function setupHorizontalScroll(containerId, optionsArray) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        
        optionsArray = [...optionsArray, ...optionsArray, ...optionsArray];
        
        optionsArray.forEach(optionText => {
            const option = document.createElement("div");
            option.classList.add("option");
            option.dataset.value = optionText;
            option.textContent = optionText;
            container.appendChild(option);
        });

        container.scrollLeft = container.scrollWidth / 3;
        
        let isScrolling;
        container.addEventListener("scroll", function () {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                let options = container.querySelectorAll(".option");
                let scrollLeft = container.scrollLeft;
                let optionWidth = options[0].offsetWidth;
                let centerIndex = Math.round(scrollLeft / optionWidth);

                options.forEach((option, index) => {
                    option.classList.remove("active");
                    if (index === centerIndex) {
                        option.classList.add("active");
                        if (containerId === "genderPicker") selectedGender = option.dataset.value;
                        if (containerId === "distancePicker") selectedDistance = option.dataset.value;
                        if (containerId === "agePicker") selectedAge = option.dataset.value;
                    }
                });

                requestAnimationFrame(() => {
                    container.scrollTo({
                        left: centerIndex * optionWidth,
                        behavior: "smooth"
                    });
                });
            }, 150); // Längre timeout för mjukare skroll
        });
    }

    setupHorizontalScroll("genderPicker", ["Men", "Women"]);
    setupHorizontalScroll("distancePicker", ["5K", "10K", "Half Marathon", "Marathon"]);
    
    const ageArray = Array.from({ length: 71 }, (_, i) => (i + 15).toString());
    setupHorizontalScroll("agePicker", ageArray);

    function setupTimePicker(pickerId, min, max) {
        const picker = document.getElementById(pickerId);
        picker.innerHTML = "";

        for (let i = min; i <= max; i++) {
            const option = document.createElement("div");
            option.classList.add("option");
            option.dataset.value = i;
            option.textContent = i;
            picker.appendChild(option);
        }

        let isScrolling;
        picker.addEventListener("scroll", function () {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
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
});
