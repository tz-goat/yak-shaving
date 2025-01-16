// Create and inject the time display element
const timeDisplay = document.createElement('div');
timeDisplay.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 10000;
    font-family: Arial, sans-serif;
`;

document.body.appendChild(timeDisplay);

// Update the display periodically
function updateTimeDisplay() {
    const currentDomain = window.location.hostname;
    
    chrome.storage.local.get(['timeData'], (result) => {
        const timeData = result.timeData || {};
        const siteData = timeData[currentDomain];
        
        if (siteData) {
            const minutes = Math.floor(siteData.totalTime / 60000);
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            
            timeDisplay.textContent = `Time on site: ${hours}h ${remainingMinutes}m`;
        } else {
            timeDisplay.textContent = 'Time on site: 0m';
        }
    });
}

// Update every 30 seconds
setInterval(updateTimeDisplay, 30000);
updateTimeDisplay(); // Initial update 