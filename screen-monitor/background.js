let timeTracker = {};

// Track active tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    const url = new URL(tab.url);
    const domain = url.hostname;
    
    // Start tracking time for this domain
    startTracking(domain);
});

// Track URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        const url = new URL(changeInfo.url);
        const domain = url.hostname;
        startTracking(domain);
    }
});

function startTracking(domain) {
    if (!timeTracker[domain]) {
        timeTracker[domain] = {
            totalTime: 0,
            startTime: Date.now()
        };
    } else {
        timeTracker[domain].startTime = Date.now();
    }
}

// Update time every second
setInterval(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0] && tabs[0].url) {
            try {
                const url = new URL(tabs[0].url);
                const domain = url.hostname;
                
                if (timeTracker[domain]) {
                    const currentTime = Date.now();
                    const timeSpent = currentTime - timeTracker[domain].startTime;
                    timeTracker[domain].totalTime += timeSpent;
                    timeTracker[domain].startTime = currentTime;
                    
                    // Save to storage
                    chrome.storage.local.set({ timeData: timeTracker });
                }
            } catch (e) {
                console.error('Invalid URL:', tabs[0].url);
            }
        }
    });
}, 5000); // Update every 5 seconds 