console.log("from inject");

function toArray(htmlCollection) {
    return new Array(htmlCollection.length).fill(0).map((ignore, index) => htmlCollection[index]);
}

function setVideoSpeed(newSpeed){

    toArray(document.getElementsByTagName('video')).map((video) => {
        if (video) {
            video.playbackRate = newSpeed;
            console.log(`Set speed to loaded default: ${newSpeed}`);
        }
      });
    
}

function matchesChannelName(channelNameToDisallow){
    
    console.log("in function", document.querySelector("yt-formatted-string[title].ytd-channel-name"));
    let channelNameOnPage = document.querySelector("yt-formatted-string[title].ytd-channel-name").innerText;
    if(channelNameOnPage != null && channelNameOnPage.includes(channelNameToDisallow)){
        setVideoSpeed(1.5);
        console.log("set speed");
    }
    console.log("after set speed");
}


function matchesTitle(videoTitleToDisallow){
    console.log("in function", document.querySelector("h1.title.ytd-video-primary-info-renderer"));
    let videoTitleOnPage = document.querySelector("h1.title.ytd-video-primary-info-renderer").innerText;
    if(videoTitleOnPage != null && videoTitleOnPage.includes(videoTitleToDisallow)){
        setVideoSpeed(1.5);
        console.log("set speed");
    }
    console.log("after set speed");
}

function setSpeedBasedOnStorage(){
    console.log("in setSpeedBasedOnStorage")
    chrome.storage.sync.get(["saveObject"], (data) => {
    console.log("saved data", data);
      data.saveObject.forEach((currentColumn) => {
        currentColumn.rows.forEach((currentRow) => {
          if(currentRow.selectValue == 'channel'){
            if(matchesChannelName(currentRow.inputValue)){
              setVideoSpeed(currentColumn.speed)
            }
          }
          else if(currentRow.selectValue == 'title'){
            if(matchesTitle(currentRow.inputValue)){
              setVideoSpeed(currentColumn.speed)
            }
          }
        })
      }); 
    })
}


setSpeedBasedOnStorage();


// let documentObserver = new MutationObserver(function (mutations, observer) {


//     // Process the DOM nodes lazily
//     requestIdleCallback(
//         (_) => {
//         mutations.forEach(function (mutation) {
//             switch (mutation.type) {
//             case "childList":
//                 if(document.querySelector("yt-formatted-string[title].ytd-channel-name")){// use all 3 queries to make sure we have an entire video page loaded? Some other metric? We need to make sure we're watching a video
//                     // matchesChannelName("Tulok");
//                     // matchesTitle("D&D");
//                     observer.disconnect();
//                 }
//                 break;
//             }
//         });
//         },
//         { timeout: 1000 }
//     );
// });

// documentObserver.observe(document, {
//     attributeFilter: ["aria-hidden", "data-focus-method"],
//     childList: true,
//     subtree: true
// });


console.log("ytd-video-owner-renderer", document.querySelector("ytd-video-owner-renderer"))
console.log("after inject");


  



