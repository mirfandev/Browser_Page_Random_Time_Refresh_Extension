document.addEventListener('DOMContentLoaded', function () {
    const timerElement = document.getElementById('timer');
    const refreshButton = document.getElementById('refreshButton');

    let interval;
    let countdown;

    function startRefresh() {
        const randomInterval = Math.floor(Math.random() * (300000 - 180000 + 1)) + 180000; // Random interval between 3 to 5 minutes

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

    refreshButton.addEventListener('click', function () {
        clearInterval(interval);
        startRefresh();
        alert("Please press the browser's refresh button manually after clicking this extension's refresh button.");
    });

    startRefresh();
});
