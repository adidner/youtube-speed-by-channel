console.log("from inject");

function toArray(htmlCollection) {
    return new Array(htmlCollection.length).fill(0).map((ignore, index) => htmlCollection[index]);
}

function setVideoSpeed(newSpeed, intervalID){ // We're passing interval ID to clear the interval if we've already set the video (this is bad because we're just trying to set the speed with an interval until we've already set it but shrug)

    toArray(document.getElementsByTagName('video')).map((video) => {
        
        if(video && video.playbackRate == newSpeed){
            clearInterval(intervalID);
        }
        if (video && video.playbackRate != newSpeed) {
            video.playbackRate = newSpeed;
            console.log(`Set speed to loaded default: ${newSpeed}`);
            
            setYoutubeTimeDisplay();
        }
        
    });

    
}

function matchesChannelName(channelNameToMatch){
    let channelNameOnPage = document.querySelector("ytd-video-owner-renderer").querySelector("ytd-channel-name").querySelector("a").innerText;
    
    console.log("channel query: ", document.querySelector("ytd-video-owner-renderer").querySelector("ytd-channel-name").querySelector("a").innerText)
    if(channelNameOnPage != null && (channelNameOnPage.includes(channelNameToMatch) || (channelNameOnPage.toLowerCase()).includes(channelNameToMatch.toLowerCase()))){
        return true;
    }
    return false;
}


function matchesTitle(videoTitleToMatch){
    let videoTitleOnPage = document.querySelector("h1.title.ytd-video-primary-info-renderer").innerText;
    if(videoTitleOnPage != null && (videoTitleOnPage.includes(videoTitleToMatch) || (videoTitleOnPage.toLowerCase().includes(videoTitleToMatch.toLowerCase())) )){
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
              setVideoSpeed(currentColumn.speed, intervalID);
            }
          }
          else if(currentRow.selectValue == 'title'){
            if(matchesTitle(currentRow.inputValue)){
              setVideoSpeed(currentColumn.speed, intervalID);
            }
          }
        })
      }); 
    })
}

// Uncomment this to make the inject section run
var intervalID = setInterval(function() {
  
    console.log("🚀 ~ file: inject.js ~ line 71 ~ intervalID ~ SET intervalID", intervalID)
    setSpeedBasedOnStorage(intervalID);
}, 500);


// if we can't set the speed in 3 seconds, kill self because we don't want to waste resources 
var killSelfID = setInterval(
  function () {
    clearInterval(intervalID);
    clearInterval(killSelfID);
    console.log("🚀 ~ file: inject.js ~ line 78 ~ CLEAR intervalID", intervalID)
  }, 
  3000
);


function millisecondsToTime(milliseconds){
  let minutes = Math.floor(milliseconds / 60);
  if(minutes < 10){
    minutes = "0" + minutes;
  }
  let seconds = Math.floor(milliseconds - minutes * 60);
  if(seconds < 10){
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}


function setYoutubeTimeDisplay(){
  let timeContainer = document.querySelector("div.ytp-time-display").children[1];
  let video = document.getElementsByTagName('video')[0];
  
  let newOpenTag = document.createElement("span");
  newOpenTag.innerText = " (";
  
  let newCurrentTime = document.createElement("span");
  newCurrentTime.id = "newCurrentTime";
  video.addEventListener("timeupdate", () => {
    newCurrentTime.innerText = millisecondsToTime(video.currentTime * (1 / video.playbackRate));
  });
  
  let newSeperator = document.createElement("span");
  newSeperator.innerText = " / ";

  let newEndTime = document.createElement("span");
  newEndTime.innerText = millisecondsToTime(video.duration * (1 / video.playbackRate));

  let newCloseTag = document.createElement("span");
  newCloseTag.innerText = ")";


  

  if(document.getElementById("setYoutubeTimeDisplay")){ // this would mean that we already have injected extra content and we want to override rather than add
    document.getElementById("setYoutubeTimeDisplay").remove();
  }
  console.log("in append")
  let spanContainer = document.createElement("span");
  spanContainer.setAttribute("id", "setYoutubeTimeDisplay");
  spanContainer.appendChild(newOpenTag);
  spanContainer.appendChild(newCurrentTime);
  spanContainer.appendChild(newSeperator);
  spanContainer.appendChild(newEndTime);
  spanContainer.appendChild(newCloseTag);

  timeContainer.appendChild(spanContainer);
  
}





console.log("after inject");


  



