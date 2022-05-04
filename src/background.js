
// To handle youtube video page
chrome.history.onVisited.addListener(onHistoryChange);



function onHistoryChange(details) { // watching for changes in browser history because youtube doesn't do page refreshes for sub navigation on their site
    
    console.log("onHistoryStateUpdated", details);
    if(details.url.includes("https://www.youtube.com/watch")) {
        console.log("in youtube/watch url for history");

        // Call Inject.js here
        chrome.tabs.query({ active: true, currentWindow: true }).then((data) => {
            let [tab] = data;
            console.log("in callback")
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["inject/inject.js"],
            });
        });

    }
    
}