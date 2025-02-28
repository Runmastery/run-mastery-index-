function setupHorizontalScroll(containerId, optionsArray) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    
    // Skapa en loop genom att duplicera listan
    optionsArray = [...optionsArray, ...optionsArray, ...optionsArray];

    optionsArray.forEach(optionText => {
        const option = document.createElement("div");
        option.classList.add("option");
        option.dataset.value = optionText;
        option.textContent = optionText;
        container.appendChild(option);
    });

    // Ställ in startpositionen i mitten
    container.scrollLeft = container.scrollWidth / 3;

    let isScrolling;
    container.addEventListener("scroll", function () {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            let options = container.querySelectorAll(".option");
            let scrollLeft = container.scrollLeft;
            let optionWidth = options[0].offsetWidth;
            let centerIndex = Math.round(scrollLeft / optionWidth);

            // Säkerställ att vi alltid är centrerade på ett alternativ
            let newScrollLeft = centerIndex * optionWidth;

            options.forEach((option, index) => {
                option.classList.remove("active");
                if (index === centerIndex) {
                    option.classList.add("active");
                    if (containerId === "genderPicker") selectedGender = option.dataset.value;
                    if (containerId === "distancePicker") selectedDistance = option.dataset.value;
                    if (containerId === "agePicker") selectedAge = option.dataset.value;
                }
            });

            setTimeout(() => {
                container.scrollTo({
                    left: newScrollLeft,
                    behavior: "smooth"
                });
            }, 50);
        }, 200); // Förläng timeouten för att undvika för många justeringar
    });
}
