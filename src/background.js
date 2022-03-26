

// chrome.extension.sendMessage({}, function (response) {});

// chrome.webNavigation.onCompleted.addListener(() => {
//     console.info("The user has loaded my favorite website!");
//     chrome.tabs.query({ active: true, currentWindow: true }).then((data) => {
//         let [tab] = data;
//         console.log("in callback")
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             files: ["inject/inject.js"],
//         });
//     });
// });


// To handle youtube video page
// chrome.webNavigation.onHistoryStateUpdated.addListener(onHistoryChange);
chrome.history.onVisited.addListener(onHistoryChange);
  
const filter = {
    url: [
        {
            urlContains: 'https://www.youtube.com/',
        },
    ],
};

console.log("background.js")



function onHistoryChange(details) { // watching for changes in browser history because youtube doesn't do page refreshes for sub navigation on their site
    
    console.log("onHistoryStateUpdated", details);
    if(details.url.includes("https://www.youtube.com/watch")) {

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