document.addEventListener('DOMContentLoaded', function () {
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');

    let interval;
    let countdown;

    function startRefresh() {
        const minRefreshTime = 300000; // 5 minutes in milliseconds
        const maxRefreshTime = 600000; // 10 minutes in milliseconds
        const minDistance = 180000;   // 3 minutes in milliseconds

        let randomInterval;

        // Generate random interval with a minimum distance of 3 minutes
        do {
            randomInterval = Math.floor(Math.random() * (maxRefreshTime - minRefreshTime + 1)) + minRefreshTime;
        } while (Math.abs(randomInterval - getLastInterval()) < minDistance);

        countdown = randomInterval / 1000;

        interval = setInterval(function () {
            countdown--;
            updateTimer(countdown);

            if (countdown <= 0) {
                clearInterval(interval);
                refreshCurrentTab();
                startRefresh();
            }
        }, 1000);

        updateTimer(countdown);

        // Save the current interval for future comparison
        saveLastInterval(randomInterval);
    }

    function getLastInterval() {
        return parseInt(localStorage.getItem('lastInterval')) || 0;
    }

    function saveLastInterval(interval) {
        localStorage.setItem('lastInterval', interval);
    }

    function stopRefresh() {
        clearInterval(interval);
        timerElement.textContent = '00:00';
    }

    function updateTimer(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(remainingSeconds).padStart(2, '0');

        timerElement.textContent = `${displayMinutes}:${displaySeconds}`;
    }

    function refreshCurrentTab() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0) {
                chrome.tabs.reload(tabs[0].id, { bypassCache: true });
            }
        });
    }

    startButton.addEventListener('click', function () {
        startRefresh();
    });

    stopButton.addEventListener('click', function () {
        stopRefresh();
    });
});
