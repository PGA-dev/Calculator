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

    //Handling for event listeners
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
    }

    // Toggle theme event handler (used icons and the basic calling structure for the icons from vydroz's approach, but only for the function/not the key mapping -- see README.md)
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
        if (resultBox.value === "" || operMap.includes(resultBox.value[resultBox.value.length - 1])) {
            return;
        }
        return resultBox.value += val;
    }

    function negDisplay() {
        if (resultBox.value === ""  || operMap.includes(resultBox.value)) {
            return;
        } else {
            resultBox.value = (-parseFloat(resultBox.value)).toString();
        }
    }

    function subtraction(val) {
        const lastChar = resultBox.value[resultBox.value.length - 1];
        if (lastChar === "-" || operMap.includes(resultBox.value)) {
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
        const calculationResult = evaluateExpression(calculation);
        if (calculationResult !== null) {
            resultBox.value = calculationResult; // Update result only if calculation is successful
            isResultCalculated = true; // Set the flag after successful calculation for result reset
        } else {
            // Log error message but retain current result and do not change isResultCalculated flag
            console.error("Calculation failed. Please check your input.");
        }
    }

    function clearResultBox() {
        resultBox.value = "";
    }

    //CLEANUP INITIALIZATION
    function cleanupAllListeners() {
        cleanupListeners(); // Remove specific event listeners
        window.removeEventListener("unload", cleanupAllListeners); // Remove unload event listener
    }

    //last call approach I call this - this approach isn't really necessary to do, 
    //to have a cleanup clean itself, instead you can call all cleanup as:
    // window.addEventListener("unload", cleanupAllListeners)
    //I just thought it might be interesting to find a way to remove the cleanup add
    //as in a more complex usage, you might conditionally clean up based upon user status
    //or login status, so I wanted structure to handle the future application
    window.addEventListener("beforeunload", function () {
        cleanupAllListeners();
    });
});
