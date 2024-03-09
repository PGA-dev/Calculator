document.addEventListener("DOMContentLoaded", function () {
    // Get refs to DOM elements
    const resultBox = document.getElementById("result");
    const clearButton = document.getElementById("clear-btn");
    const buttons = document.querySelectorAll(".calculator input[type='button']");
    const toggleLightDark = document.getElementById("theme");

    //hash string array for operator lookup
    const operMap = ["**", "+", "*", "/", "%", "-"];

    // Flag to track if the result has been calculated
    let isResultCalculated = false;


// Add event listeners

    //clear
    clearButton.addEventListener("click", clearResultBox);
    //button handler event add
    buttons.forEach(button => {
        button.addEventListener("click", buttonClickHandler);
    });
    //Theme toggle event add
    toggleLightDark.addEventListener("click", toggleLightDarkClickHandler);


// Cleanup functions for event listeners
    function clearButtonCleanup() {
        clearButton.removeEventListener("click", clearResultBox);
    }

    function buttonsCleanup() {
        buttons.forEach(button => {
            button.removeEventListener("click", buttonClickHandler);
        });
    }

    function toggleLightDarkCleanup() {
        toggleLightDark.removeEventListener("click", toggleLightDarkClickHandler);
    }

    // Button click event handler
    function buttonClickHandler() {
        const value = this.value;
        const lastChar = resultBox.value[resultBox.value.length - 1];
        if (isResultCalculated && value !== "=") {
            clearResultBox(); // Clear the result box if a key other than "=" is clicked after calculation
            isResultCalculated = false; // Reset the flag
        }
        if (value === "←") {
            backSpace();
        }else if (value === "-") {
            negDisplay(value);
        } else if (value === "=") {
            calculate();
            isResultCalculated = true; // Set the flag after calculation for result reset
        } else if (value === "🌙" || value === "🌞") {
            toggleTheme();
        } else if (value === "CE") {
            clearResultBox();
        }  else if (operMap.includes(value)) {
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
    }

    // Toggle theme event handler
    function toggleLightDarkClickHandler() {
        let themeToggle = document.documentElement.getAttribute('theme') == null;
        themeToggle ? document.documentElement.setAttribute('theme', 'light') : document.documentElement.removeAttribute('theme', 'light');
        toggleLightDark.textContent = themeToggle ? "🌙" : "🌞";
    }

    // Additional functions and callback
    function keyDisplay(val) {
        resultBox.value += val;
    }

    function decDisplay(val) {
        if (resultBox.value[resultBox.value.length - 1] === '.') {
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

    // Cleanup functions call
    function cleanupAllListeners() {
        clearButtonCleanup();
        buttonsCleanup();
        toggleLightDarkCleanup();
    }

    // Cleanup all event listeners on page unload
    window.addEventListener("unload", cleanupAllListeners);
});
