// background.js

function background(){
  

  chrome.storage.onChanged.addListener((changes) => {
    console.log("background")
    console.log("ch ch ch changes", changes);
    //when we change whats in the storage we'll want to   
  });


  const filter = {
    url: [
      {
        urlContains: 'https://www.youtube.com/watch',
      },
    ],
  };

  chrome.webNavigation.onCompleted.addListener(() => {

    setSpeedBasedOnStorage();


  }, filter);

  function toArray(htmlCollection) {
    return new Array(htmlCollection.length).fill(0).map((ignore, index) => htmlCollection[index]);
  }

  function setVideoSpeed(newSpeed){

    toArray(document.getElementsByTagName('video')).map((video) => {
        if (video) {
            video.playbackRate = newSpeed;
        }
      });
    
  }

  function matchesChannelName(channelNameToDisallow){
    let channelNameOnPage = document.querySelector("yt-formatted-string[title].ytd-channel-name").innerText;
    if(channelNameOnPage != null && channelNameOnPage.includes(channelNameToDisallow)){
        return true;
    }
    return false;
  }


  function matchesTitle(videoTitleToDisallow){
    let videoTitleOnPage = document.querySelector("h1.title.ytd-video-primary-info-renderer").innerText;
    if(videoTitleOnPage != null && videoTitleOnPage.includes(videoTitleToDisallow)){
        return true;
    }
    return false;
  }


  function setSpeedBasedOnStorage(){
    console.log("in setSpeedBasedOnStorage")
    chrome.storage.sync.get(["saveObject"], (data) => {
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





  // let documentObserver = new MutationObserver(function (mutations, observer) {


  //   // Process the DOM nodes lazily
  //   requestIdleCallback(
  //       (_) => {
  //       mutations.forEach(function (mutation) {
  //           switch (mutation.type) {
  //           case "childList":
  //               if(document.querySelector("yt-formatted-string[title].ytd-channel-name")){// use all 3 queries to make sure we have an entire video page loaded? Some other metric? We need to make sure we're watching a video
  //                   observer.disconnect();
  //               }
  //               break;
  //           }
  //       });
  //       },
  //       { timeout: 1000 }
  //   );
  // });

  // documentObserver.observe(document, {
  //   attributeFilter: ["aria-hidden", "data-focus-method"],
  //   childList: true,
  //   subtree: true
  // });


}

background();

