chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "clear_cookies") {
        document.cookie.split(';').forEach(function(c) {
            document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          });
        sendResponse("Deleted")
    }else{
        sendResponse("Failed")
    }
})