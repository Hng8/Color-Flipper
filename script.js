
let random = document.getElementById("random");
let custom = document.getElementById("custom");
let container = document.querySelector(".container");
let colors = container.querySelectorAll("div");

// Make an event listner for the divs on each div target it will show the data attribute and get the color name
colors.forEach(color => {
    color.addEventListener('click', function(color) {
        let targetColor = color.target.getAttribute('data-color');
        document.body.style.background = targetColor;
    });
})


let randomColor = ["purple", "orange", "yellow", "black"];
// Array of custom color 

// Elements
let header = document.getElementById("header");

// Make the header color change automatically(We make two things in one funcion
// change the background color randomly and the header color)
function dynamicColorChange(colorArray) {
    if (!colorArray || colorArray.length === 0){
        console.error("Color array is empty or undefined.");
        return; // Early exit if no valid colors are available
    }

    let randomIndex = Math.floor(Math.random() * colorArray.length);
    let randomCol = colorArray[randomIndex];

    document.body.style.background = randomCol;

    if (randomCol !== 'black') {
        header.style.color = 'black';
    } else {
        header.style.color = 'white';
        
    }

}

random.addEventListener("click", function() {
    dynamicColorChange(randomColor);
});


// dynamic animation helper 
function showNotification(notificationElement) {
    // Remove any previous fade classes to reset the animation
    notificationElement.classList.remove('fade');

    // Add 'show' class to trigger the sliding animation
    notificationElement.classList.add('show');
    
    // After 4 seconds, add 'fade' class to start the fade-out animation
    setTimeout(() => {
        notificationElement.classList.add('fade');
    }, 2000); // Show the notification for 2 seconds

    // Remove the 'show' class and hide the notification after fade-out completes
    setTimeout(() => {
        notificationElement.classList.remove('show', 'fade');
        // notifiElement.style.display = 'none'; // Ensures the div is hidden after animation
    }, 3000); // This timeout should be 1 second longer than the first timeout


}

// Global array to store custom colors from input
let customColorsFromInput = [];

// Retrieve the string from localStorage
const storedColors = localStorage.getItem('customColors');
// Convert the string back to an array
const SavedColorsFromLocalStorage = storedColors ? JSON.parse(storedColors): [];

// Initialize customColorsFromInput with saved colors on load
customColorsFromInput = [...SavedColorsFromLocalStorage];

// on click of custom button it take the value of the input and add it to 
// custom array  and trigger the notification class
function colorSub() {

    let customColor = document.getElementById("custom-color").value.trim();
    document.getElementById("custom-color").value = " "; // Clear the input field

    const notiSucc = document.getElementById("notifi-succ");
    const notiFalse = document.getElementById("notifi-false");

    // Validate and add the color
    if (isValidColor(customColor)) {
        console.log(`valid color: ${customColor}`);
        customColorsFromInput.push(customColor);

        // Convert the array to a string to store it 
        localStorage.setItem('customColors', JSON.stringify(customColorsFromInput));

        // Update allColors dynamically, remving duplicates
        updateAllColors();

        showNotification(notiSucc);
    }
    else {
        showNotification(notiFalse);
    }

    console.log(customColorsFromInput);

}

// Helper function to upadate allColors and remove duplicates
function updateAllColors() {
     // Combine arrays and remove duplicates(mergin dublicated colors into new set)
    const allColors = [...new Set([...customColorsFromInput, ...SavedColorsFromLocalStorage])];
    console.log(allColors);

    // Trigger the dynamic color change with the updated color list
    dynamicColorChange(allColors);
}

// Event listener for the custom button to trigger color change
custom.addEventListener("click", function() {
    updateAllColors();
});

// // Function to check if the input is a valid color
function isValidColor(color) {
    let tempElement = document.createElement("div");
    tempElement.style.color = color; // try setting the color
    return tempElement.style.color !== ""; // Check if the browser recognizes the color
}


// Listen for 'Enter' key press on the input field
document.getElementById("custom-color").addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        colorSub();
    }
})


let myAutoColor;

function autoColor() {
    updateAllColors()
}

function startAutoColor() { // Clickable function for auto button
    if (!myAutoColor) { // only starts if the intervial isn't already running
        myAutoColor = setInterval(autoColor, 2000);
    } 
    else if(myAutoColor) {
        autoStop()
}}

function autoStop() {
    clearInterval(myAutoColor);
    myAutoColor = null; // reset the interval variable to allow restart 
}


// Combine colors functions 

function combineColors() {
    // Get colors from input fields
    const color1 = document.getElementById("favColor1").value;
    const color2 = document.getElementById("favColor2").value;

    // Blend colors with Colord
    const blendedColor = tinycolor.mix(color1, color2, 50).toHexString();
    
    // Display the result
    document.body.style.background = blendedColor;
    document.getElementById("combine").innerText = blendedColor;
}