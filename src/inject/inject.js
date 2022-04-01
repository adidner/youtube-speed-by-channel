console.log("from inject");

function toArray(htmlCollection) {
    return new Array(htmlCollection.length).fill(0).map((ignore, index) => htmlCollection[index]);
}

function setVideoSpeed(newSpeed, intervalID){ // We're passing interval ID to clear the interval if we've already set the video (this is bad because we're just trying to set the speed with an interval until we've already set it but shrug)

    toArray(document.getElementsByTagName('video')).map((video) => {
        
        if(video && video.playbackRate == newSpeed){
            clearInterval(intervalID);
        }
        if (video) {
            video.playbackRate = newSpeed;
            console.log(`Set speed to loaded default: ${newSpeed}`);
        }
        
    });
    
}

function matchesChannelName(channelNameToMatch){
    // console.log("in function", document.querySelector("yt-formatted-string[title].ytd-channel-name"));
    // let channelNameOnPage = document.querySelector("yt-formatted-string[title].ytd-channel-name").innerText;
    let channelNameOnPage = document.querySelector("ytd-video-owner-renderer").querySelector("ytd-channel-name").querySelector("a").innerText;
    
    console.log("channel query: ", document.querySelector("ytd-video-owner-renderer").querySelector("ytd-channel-name").querySelector("a").innerText)
    if(channelNameOnPage != null && channelNameOnPage.includes(channelNameToMatch)){
        return true;
    }
    return false;
}


function matchesTitle(videoTitleToMatch){
    // console.log("in function", document.querySelector("h1.title.ytd-video-primary-info-renderer"));
    let videoTitleOnPage = document.querySelector("h1.title.ytd-video-primary-info-renderer").innerText;
    if(videoTitleOnPage != null && videoTitleOnPage.includes(videoTitleToMatch)){
        return true;
    }
    return false;
}

function setSpeedBasedOnStorage(intervalID){// We're passing interval ID to clear the interval if we've already set the video (this is bad because we're just trying to set the speed with an interval until we've already set it but shrug)
    console.log("in setSpeedBasedOnStorage")
    chrome.storage.sync.get(["saveObject"], (data) => {
    console.log("saved data", data);
      data.saveObject.forEach((currentColumn) => {
        currentColumn.rows.forEach((currentRow) => {
          if(currentRow.selectValue == 'channel'){
            if(matchesChannelName(currentRow.inputValue)){
              setVideoSpeed(currentColumn.speed, intervalID)
            }
          }
          else if(currentRow.selectValue == 'title'){
            if(matchesTitle(currentRow.inputValue)){
              setVideoSpeed(currentColumn.speed, intervalID)
            }
          }
        })
      }); 
    })
}

// Uncomment this to make the inject section run
var intervalID = setInterval(function() {
    setSpeedBasedOnStorage(intervalID);
}, 500);


// if we can't set the speed in 3 seconds, kill self because we don't want to waste resources 
setInterval(
  function () {
    clearInterval(intervalID)
  }, 
  3000
)




console.log("after inject");


  



