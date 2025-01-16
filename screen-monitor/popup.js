document.addEventListener('DOMContentLoaded', () => {
    // Get stored time data
    chrome.storage.local.get(['timeData'], (result) => {
        const timeData = result.timeData || {};
        const statsContainer = document.getElementById('statsContainer');
        
        // Display stats for each domain
        Object.keys(timeData).forEach(domain => {
            console.log(timeData[domain].totalTime)
            const totalTime = timeData[domain].totalTime
            const sec = Math.floor((totalTime % 60000) / 1000)
            const minutes = Math.floor(totalTime / 60000);
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            
            const statsDiv = document.createElement('div');
            statsDiv.className = 'site-stats';
            statsDiv.innerHTML = `
                <div class="site-name">${domain}</div>
                <div class="time-spent">Time spent: ${hours}h ${remainingMinutes}m ${sec}s</div>
            `;
            statsContainer.appendChild(statsDiv);
        });
    });
}); 