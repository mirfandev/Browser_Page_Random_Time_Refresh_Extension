// Background script is used to maintain state across the extension
chrome.runtime.onInstalled.addListener(function () {
    // Set initial value for avoiding consecutive refresh with the same interval
    chrome.storage.local.set({ lastInterval: 0 });
});
