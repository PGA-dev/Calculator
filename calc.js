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
            return "Error";
        }
    }

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

    // Initialize event listeners 
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
        } else if (value === "-") {
            negDisplay(value);
        } else if (value === "=") {
            calculate();
            isResultCalculated = true; // Set the flag after calculation for result reset
        } else if (value === "🌙" || value === "🌞") {
            toggleTheme();
        } else if (value === "CE") {
            clearResultBox();
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

    function negDisplay(val) {
        const lastChar = resultBox.value[resultBox.value.length - 1];
        const secondLastChar = resultBox.value[resultBox.value.length - 2];
        if (resultBox.innerHTML.length <= 1 && lastChar === "-") {
            return; // Prevent "--"
        } else if (lastChar === "-" && secondLastChar === "-") {
            return; // Prevent "--"
        }
        else if (resultBox.value === "" || operMap.includes(lastChar)) {
            resultBox.value += val;
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
        calulationResult = evaluateExpression(calculation); //using the evaluateExpression to safely do our work
        resultBox.value = calulationResult;
    }

    function clearResultBox() {
        resultBox.value = "";
    }

    //Cleanup Initialization
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
