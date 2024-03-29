document.addEventListener("DOMContentLoaded", function () {
    // Get refs to DOM elements
    const resultBox = document.getElementById("result");
    const clearButton = document.getElementById("clear-btn");
    const buttons = document.querySelectorAll(".calculator input[type='button']");
    const toggleLightDark = document.getElementById("theme");

    // Hash map for operator lookup
    const operMap = {
        "**": true,
        "+": true,
        "*": true,
        "/": true,
        "%": true,
        "-": true
    };

    // Flag to track if the result has been calculated
    let isResultCalculated = false;

    // To get rid of the eval() curse that was the legacy of early versions:
    function evaluateExpression(expression) {
        try {
            return new Function('return ' + expression)();
        } catch (error) {
            console.error("Error evaluating expression:", error);
            clearResultBox();
            return null;
        }
    }

    // Handling for event listeners
    function addListeners() {
        try {
            clearButton.addEventListener("click", clearResultBox);
            buttons.forEach(button => {
                button.addEventListener("click", buttonClickHandler);
            });
            toggleLightDark.addEventListener("click", toggleLightDarkClickHandler);
        } catch (error) {
            console.error("Error attaching listeners", error);
            return "Error";
        }
    }

    // INITIALIZE EVENT LISTENERS 
    addListeners();

    // Cleanup functions for event listeners
    function cleanupListeners() {
        clearButton.removeEventListener("click", clearResultBox);
        buttons.forEach(button => {
            button.removeEventListener("click", buttonClickHandler);
        });
        toggleLightDark.removeEventListener("click", toggleLightDarkClickHandler);
    }

    function buttonClickHandler() {
        const value = this.value;
        const lastChar = resultBox.value[resultBox.value.length - 1];
        if (isResultCalculated && value !== "=") {
            clearResultBox(); // Clear the result box if a key other than "=" is clicked after calculation
            isResultCalculated = false; // Reset the flag
        }
        if (value === "←") {
            backSpace();
        } else if (value === "neg") {
            negDisplay();
        } else if (value === "=") {
            calculate();
            isResultCalculated = true; // Set the flag after calculation for result reset
        } else if (value === "🌙" || value === "🌞") {
            toggleTheme();
        } else if (value === "CE") {
            clearResultBox();
        } else if (value === "-") {
            subtraction(value);
        } else if (operMap[value]) { // Check if value is an operator
            if (resultBox.value !== "" && !operMap[lastChar] && lastChar !== ".") {
                operDisplay(value);
            }
        } else if (value === ".") {
            if (resultBox.value != "." || !operMap[lastChar]) {
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

    // Additional functions for keymapped functionality
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
        if (resultBox.value === "" || operMap[resultBox.value[resultBox.value.length - 1]]) {
            return;
        }
        return resultBox.value += val;
    }

    function negDisplay() {
        if (resultBox.value === "" || operMap[resultBox.value.lastChar]) {
            return;
        } else {
            resultBox.value = (-parseFloat(resultBox.value)).toString(); //re-write for correct slice grab
        }
    }

    function subtraction(val) {
        const lastChar = resultBox.value[resultBox.value.length - 1];
        if (lastChar === "-" || operMap[lastChar]) {
            return; // Prevent improper usage
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

        calculation = calculation.replace(/\*\*/g, '**');

        try {
            const calculationResult = evaluateExpression(calculation);
            if (calculationResult !== null) {
                resultBox.value = calculationResult; // Update result only if calculation is successful
                isResultCalculated = true; // Set the flag after successful calculation for result reset
            } else {
                // Log error message but retain current result and do not change isResultCalculated flag
                console.error("Calculation failed. Please check your input.");
            }
        } catch (error) {
            console.error("Error evaluating expression:", error);
            clearResultBox();
        }
    }



    function clearResultBox() {
        resultBox.value = "";
    }

    // Cleanup initialization
    function cleanupAllListeners() {
        cleanupListeners(); // Remove specific event listeners
        window.removeEventListener("unload", cleanupAllListeners); // Remove unload event listener
    }

    window.addEventListener("beforeunload", function () {
        cleanupAllListeners();
    });
});
