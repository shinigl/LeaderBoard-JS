let fn = document.getElementById('fn');
let ln = document.getElementById('ln');
let cnt = document.getElementById('country');
let num = document.getElementById('score');
let btn = document.getElementById('btn');
let container = document.querySelector('.board');
let scoreEntries = []; // Array to store score entries

btn.addEventListener("click", (e) => {
    e.preventDefault();

    // Check for empty fields before proceeding
    if (fn.value !== "" && ln.value !== "" && num.value !== "") {
        let div = document.createElement("div");
        container.appendChild(div);

        let name = document.createElement("p");
        name.textContent = fn.value + " " + ln.value;
        div.appendChild(name);

        let countryName = document.createElement("p");
        countryName.textContent = cnt.value;
        div.appendChild(countryName);

        let score = parseInt(num.value);
        let scoreDisplay = document.createElement("p");
        scoreDisplay.textContent = score;
        div.appendChild(scoreDisplay);

        let add = document.createElement("button");
        add.innerText = "+5";
        div.appendChild(add);

        let subtract = document.createElement("button");
        subtract.innerText = "-5";
        div.appendChild(subtract);

        // Add event listeners for score modification
        add.addEventListener("click", () => {
            score += 5;
            scoreDisplay.textContent = score;
            updateScoreEntry(div, score); // Update the score entry in the array
            sortAndDisplayEntries(); // Sort and display the entries
        });

        subtract.addEventListener("click", () => {
            // Ensure score does not go below 0
            if (entry.score > 0) {
                entry.score -= 5;
                if(entry.score < 0){
                    entry.score = 0 ;
                }
                scoreDisplay.textContent = entry.score;
                sortAndDisplayEntries(); // Sort and display the entries
            } 
        });

        let del = document.createElement("button");
        del.innerText = "🚮";
        div.appendChild(del);

        del.addEventListener("click", () => {
            div.remove();
            scoreEntries = scoreEntries.filter(entry => entry.div !== div); // Remove from array
        });

        // Store the score entry in an object and add it to the array
        let entry = {
            div: div,
            score: score
        };
        scoreEntries.push(entry);

        // Initial sort and display of entries
        sortAndDisplayEntries();

        // Clear input fields
        fn.value = "";
        ln.value = "";
        num.value = "";
    }
});

// Function to update score entry in the array
function updateScoreEntry(div, newScore) {
    let entry = scoreEntries.find(entry => entry.div === div);
    if (entry) {
        entry.score = newScore; // Update the score in the array
    }
}

// Function to sort the entries based on scores and re-display them
function sortAndDisplayEntries() {
    // Sort scoreEntries by score in descending order
    scoreEntries.sort((a, b) => b.score - a.score);

    // Clear the container and re-add sorted entries
    container.innerHTML = ""; // Clear existing entries
    scoreEntries.forEach(entry => {
        container.appendChild(entry.div); // Re-add sorted divs to the container
    });
}
