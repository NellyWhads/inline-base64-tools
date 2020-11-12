function sendMessage(message) {
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    // Logging to background extension console
    console.log("item " + info.menuItemId + " was clicked");

    // Handle checked state toggling
    if (info.menuItemId === "copyToClipboard") {
        chrome.storage.local.set({ "copyToClipboard": info.checked });
        return;
    }
    else if (info.menuItemId === "decodeOnSelect") {
        chrome.storage.local.set({ "decodeOnSelect": info.checked });
        return;
    }

    // Select method
    var message = ""
    if (info.menuItemId === "decodeBase64") {
        message = { "invoke": "decodeBase64Selection"};
    }
    else if (info.menuItemId === "encodeBase64") {
        message = { "invoke": "encodeBase64Selection"};
    }

    // Send message
    if (message) {
        sendMessage(message);
    }
});