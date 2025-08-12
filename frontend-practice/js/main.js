// Main JavaScript file for frontend practice

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ JavaScript is working!');
    
    // Get the test button
    const testButton = document.getElementById('test-button');
    
    // Add click event listener
    testButton.addEventListener('click', function() {
        // This demonstrates:
        // 1. Event handling
        // 2. DOM manipulation
        // 3. Template literals (backticks)
        // 4. Array methods
        
        const messages = [
            'Great! JavaScript is working perfectly! 🎉',
            'You clicked the button! Event handling works! ✨',
            'Design systems + code = powerful combination! 💪',
            'Keep practicing and building! 🚀'
        ];
        
        // Get a random message
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Update button text
        testButton.textContent = randomMessage;
        
        // Reset after 2 seconds
        setTimeout(() => {
            testButton.textContent = 'Click me to test JavaScript!';
        }, 2000);
        
        console.log(`Button clicked at: ${new Date().toLocaleTimeString()}`);
    });
});

// Example function demonstrating modern JavaScript
function createCard(title, content) {
    // This shows:
    // - Function declarations
    // - Template literals
    // - DOM manipulation
    // - Method chaining
    
    const cardHTML = `
        <div class="card">
            <h2 class="card__title">${title}</h2>
            <p class="card__content">${content}</p>
        </div>
    `;
    
    return cardHTML;
}

// Export for potential module use later
// (This prepares for when you learn about modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createCard };
}