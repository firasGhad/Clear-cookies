chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "get_cookies") {
        let cookies = document.cookie.split(';');
        cookies = cookies.map(cookie => cookie.trim().split('='))
        cookies = cookies.map(cookie => {
            return {
                key: cookie[0],
                value: cookie[1]
            }
        })
        sendResponse(cookies);
    }
})