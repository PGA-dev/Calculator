document.addEventListener("DOMContentLoaded", function () {
    // Get references to DOM elements
    const resultBox = document.getElementById("result");
    const clearButton = document.getElementById("clear-btn");
    const buttons = document.querySelectorAll(".calculator input[type='button']");
    const toggleLightDark = document.getElementById("theme");

    //hash array for operator lookup
    const operMap = ["**", "+", "*", "/", "%", "-"];

    // Flag to track if the result has been calculated
    let isResultCalculated = false; 

// Add event listeners
    clearButton.addEventListener("click", clearResultBox);
    //button event mapping
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = this.value;
            const lastChar = resultBox.value[resultBox.value.length - 1];
            if (isResultCalculated && value !== "=") {
                clearResultBox(); // Clear the result box if a key other than "=" is clicked after calculation
                isResultCalculated = false; // Reset the flag
            }
            if (value === "←") {
                backSpace();
            } else if (value === "=") {
                calculate();
                isResultCalculated = true; // Set the flag after calculation
            } else if (value === "🌙" || value === "🌞") {
                toggleTheme();
            } else if (value === "CE") {
                clearResultBox();
            } else if (value === "-") {
                negDisplay(value);
            } else if (operMap.includes(value)) {
                if (resultBox.value !== "" && !operMap.includes(lastChar) && lastChar !== ".") {
                    operDisplay(value);
                }
            } else if (value === ".") {
                if (resultBox.value != "." || !operMap.includes(lastChar)) {
                    decDisplay(value);
                }
            } else {
                keyDisplay(value);
            }

        });
    });

    // Toggle theme function
    toggleLightDark.addEventListener('click', () => {
        let themeToggle = document.documentElement.getAttribute('theme') == null;
        themeToggle ? document.documentElement.setAttribute('theme', 'light') : document.documentElement.removeAttribute('theme', 'light');
        toggleLightDark.textContent = themeToggle ? "🌙" : "🌞";
    }, false);

    // Additional functions and callback
    function keyDisplay(val) {
        resultBox.value += val;
    }

    function decDisplay(val) {
        if (resultBox.value[resultBox.value.length - 1] === operMap[4]) {
            return;
        }
        return resultBox.value += val;
    }

    function operDisplay(val) {
        if (resultBox.value === "" || operMap.includes(resultBox.value[resultBox.value.length - 1])) {
            return;
        }
        return resultBox.value += val;
    }

    function negDisplay(val) {
        const lastChar = resultBox.value[resultBox.value.length - 1];
        const secondLastChar = resultBox.value[resultBox.value.length - 2];
        if (resultBox.value === "" || operMap.includes(lastChar)) {
            resultBox.value += val;
        } else if (lastChar === "-" && secondLastChar === "-") {
            return; // Prevent "--"
        } else if (lastChar === ".") {
            return; // Prevent ".-" or ".."
        } else {
            resultBox.value += val;
        }
    }

    function backSpace() {
        let back = resultBox.value;
        result = back.slice(0, -1);
        resultBox.value = result;
    }

    function calculate() {
        let calculation = resultBox.value;
        calulationResult = eval(calculation);
        resultBox.value = calulationResult;
    }

    function clearResultBox() {
        resultBox.value = "";
    }
});
