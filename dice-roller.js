document.getElementById("rollButton").addEventListener("click", rollDice);
document.getElementById("breakdownButton").addEventListener("click", applyBreakdown);
document.getElementById("madnessDice").addEventListener("input", validateDiceInput);
document.getElementById("exhaustionDice").addEventListener("input", validateDiceInput);

function rollDice() {
    // Get the input values
    const willpowerCount = parseInt(document.getElementById("willpowerDice").value);
    const madnessCount = parseInt(document.getElementById("madnessDice").value);
    const exhaustionCount = parseInt(document.getElementById("exhaustionDice").value);

    // Roll the dice for each category
    const willpowerResults = rollDicePool(willpowerCount);
    const madnessResults = rollDicePool(madnessCount);
    const exhaustionResults = rollDicePool(exhaustionCount);

    // Display the results
    document.getElementById("willpowerResults").textContent = "Willpower: " + willpowerResults.join(", ");
    document.getElementById("madnessResults").textContent = "Madness: " + madnessResults.join(", ");
    document.getElementById("exhaustionResults").textContent = "Exhaustion: " + exhaustionResults.join(", ");

    // Calculate successes
    const successCount = countSuccesses(willpowerResults, madnessResults, exhaustionResults);
    document.getElementById("successCount").textContent = successCount;
}

// Function to apply breakdown: reduce Willpower by 1, increase Madness by at least 1
function applyBreakdown() {
    const willpowerInput = document.getElementById("willpowerDice");
    const madnessInput = document.getElementById("madnessDice");

    // Decrease Willpower by 1, but not below 1
    let willpowerCount = parseInt(willpowerInput.value);
    if (willpowerCount > 1) {
        willpowerCount--;
        willpowerInput.value = willpowerCount;
    }

    // Increase Madness by at least 1, but not above the maximum of 6
    let madnessCount = parseInt(madnessInput.value);
    if (madnessCount < 6) {
        madnessCount++;
        madnessInput.value = madnessCount;
    }
}

// Function to roll a pool of dice
function rollDicePool(diceCount) {
    const results = [];
    for (let i = 0; i < diceCount; i++) {
        results.push(Math.floor(Math.random() * 6) + 1);
    }
    return results;
}

// Function to count successes (dice that rolled 1, 2, or 3)
function countSuccesses(...diceArrays) {
    let successCount = 0;
    diceArrays.flat().forEach((roll) => {
        if (roll >= 1 && roll <= 3) {
            successCount++;
        }
    });
    return successCount;
}

// Function to validate the Madness and Exhaustion dice inputs
function validateDiceInput(event) {
    const input = event.target;
    const max = input.id === "madnessDice" ? 6 : 7;

    if (input.value > max) {
        input.value = max;
    } else if (input.value < 0) {
        input.value = 0;
    }
}
