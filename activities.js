// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to all necessary DOM elements
    const getInsightsButton = document.getElementById('getInsightsButton');
    const bodyWeightInput = document.getElementById('bodyWeight');
    const stressLevelInput = document.getElementById('stressLevel');
    const stressValueSpan = document.getElementById('stressValue');
    const insightsContainer = document.getElementById('insightsContainer');
    const insightsList = document.getElementById('insightsList');

    // Update the stress level display as the user moves the slider
    stressLevelInput.addEventListener('input', () => {
        stressValueSpan.textContent = stressLevelInput.value;
    });

    // Handle the button click event
    getInsightsButton.addEventListener('click', () => {
        // Clear previous insights and hide the container
        insightsList.innerHTML = '';
        insightsContainer.classList.add('hidden');

        // Retrieve and parse user input
        const bodyWeight = parseFloat(bodyWeightInput.value);
        const stressLevel = parseInt(stressLevelInput.value);

        // Input validation to ensure data is valid and within range
        if (isNaN(bodyWeight) || bodyWeight < 30 || bodyWeight > 200 || isNaN(stressLevel) || stressLevel < 1 || stressLevel > 10) {
            insightsList.appendChild(createMessageElement("Please enter valid data. Your weight should be between 30 and 200 kg.", "warning"));
            insightsContainer.classList.remove('hidden');
            return;
        }

        // Show a temporary "analyzing" message
        const processingMessage = createMessageElement("Analyzing your data...", "info");
        insightsList.appendChild(processingMessage);
        insightsContainer.classList.remove('hidden');

        // Simulate a delay for processing and then display insights
        setTimeout(() => {
            insightsList.removeChild(processingMessage);
            const insights = getPersonalizedInsights(bodyWeight, stressLevel);

            // If insights were generated, display them. Otherwise, show a positive message.
            if (insights.length > 0) {
                insights.forEach(insight => {
                    insightsList.appendChild(createMessageElement(insight, "info"));
                });
            } else {
                insightsList.appendChild(createMessageElement("You are on a great path! Your data suggests a healthy balance. Keep up the positive habits!", "success"));
            }
        }, 1500); // 1.5-second delay
    });

    /**
     * Generates a styled message element to be displayed in the insights list.
     * @param {string} message The text content of the message.
     * @param {string} type The type of message ("info", "success", "warning").
     * @returns {HTMLElement} The created message div.
     */
    function createMessageElement(message, type) {
        const div = document.createElement('div');
        let backgroundColor, iconSvg;

        switch (type) {
            case "info":
                backgroundColor = "bg-blue-100 text-blue-700";
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
                break;
            case "success":
                backgroundColor = "bg-green-100 text-green-700";
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
                break;
            case "warning":
                backgroundColor = "bg-red-100 text-red-700";
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2L1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
                break;
            default:
                backgroundColor = "bg-gray-100 text-gray-700";
                iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"/></svg>`;
        }
        div.className = `p-4 rounded-lg font-medium flex items-center ${backgroundColor} amazon-style-message`;
        div.innerHTML = iconSvg + message;
        return div;
    }

    /**
     * Provides personalized health insights based on user data.
     * @param {number} weight The user's body weight in kg.
     * @param {number} stress_level The user's self-reported stress level (1-10).
     * @returns {string[]} An array of insights.
     */
    function getPersonalizedInsights(weight, stress_level) {
        const insights = [];

        // Insight logic based on weight
        if (weight >= 90) {
            insights.push("Your current body weight is a bit high. Incorporating more physical activity like walking or jogging could be beneficial for your long-term health.");
        } else if (weight >= 70 && weight < 90) {
            insights.push("Your body weight is within a healthy range. Focus on maintaining a balanced diet and regular exercise to stay on track.");
        } else {
            insights.push("You are at a healthy weight. Continue your healthy habits, and consider activities like strength training to build muscle.");
        }

        // Insight logic based on stress level
        if (stress_level >= 8) {
            insights.push("Your reported stress level is very high. Make time for mindfulness, deep breathing exercises, or a relaxing hobby to manage your mental well-being.");
        } else if (stress_level >= 5 && stress_level < 8) {
            insights.push("Your stress level is moderate. Try to find a healthy outlet, like light exercise or social activities, to prevent burnout.");
        } else {
            insights.push("Your stress level is low. This is a great sign! Continue to prioritize self-care and activities that help you relax.");
        }

        return insights;
    }

});
