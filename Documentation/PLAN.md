Steps to work through

[X] finished

[-] in progress

[ ] not begun

<br/>

- [X] Set Requirements
    - See `Requirements file`
- [X] Make a basic design
    - See `Design file`
- [X] Research local dev setup for Chrome Extensions
    - See `Readme`
    - https://developer.chrome.com/docs/extensions/mv3/getstarted/
- [X] Research basics of Chrome Extension programming
    - https://www.youtube.com/watch?v=uV4L-wcnK3Y
    - https://www.youtube.com/watch?v=wHZCYi1K664
    - https://developer.chrome.com/docs/extensions/mv3/getstarted/
- [X] Look at source for similar-ish projects
    - https://chrome.google.com/webstore/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk/related?hl=en-US
    - https://github.com/igrigorik/videospeed
    - https://chrome.google.com/webstore/detail/custom-youtube-speed/hjemikpikabiolgbpbdlgeccljdfdicf/related?hl=en
    - https://github.com/elunico/custom-youtube-speed/blob/master/chrome/custom-youtube-speed/manifest.json
- [-] Write code progressively
    - [X] On Browser init, set to some arbitrary speed 
    - [X] Now similar but different if title, video name or description is part of an array. 
        - [X] Query is good and working 
        - [X] But I'm having trouble loading content at the right time https://stackoverflow.com/questions/63621540/document-queryselector-returns-null-until-element-is-inspected-using-devtools && https://www.reddit.com/r/learnjavascript/comments/5xtl28/why_does_documentqueryselector_return_null_in_my/
        - [X] Need to play more with mutation observers as a solution as it seems the content is not initially their
    - [X] Make query selectors for Description and title as well -> we're gonna not do description for now potentially in the future, currently feel unecessary
    - [X] Make default/initial structure for popup.html
    - [X] Make js re-creation so I can add more rows and such and get that working with buttons in popup
    - [X] Make similar logic to the adding content row section so that I can add content columns as well
    - [X] Save data content and shape from popup on popup close 
    - [X] load data content and shape to popup on popup open 
        - [X] more specifically probably I probably want to modify the AddNewRowButton and AddContentColumn so they can take initial values for their input and speed respectively and then call them both in a nested for loop fashion as I walk through my saveObject.
    - [X] make communication between frontend and backend via chrome messages so I can apply backend code based on black list from frontend -> this isn't quite what happened. So I can use the manifest to do page navigation triggers for injection scripts so I did that. And in the inject I used the storage sync to grab the data we want and then run  with minor modification
    - [X] on popup close re-run background script to apply changes to open windows (barring that make an apply changes button or something I guess, or perhaps have it run on every change if thats easy?)
        - [X] on popup close save all my changes (barring that make an apply changes button or something I guess, or perhaps have it run on every change if thats easy?) -> onBlur listener for inputs and select? -> uneeded because of how everything should save every time anything is changed. 
    - [X] Add a button for deleting content columns
        - [] Bug where we can't delete to 0 for some reason, possibly race condition
    - [-] Doesn't start if the youtube chrome extension hasn't been opened
        - [X] https://developer.chrome.com/docs/extensions/mv2/runtime_host_permissions/
    - [X] I want to display current speed of youtube channel and now the modififed video time next to the total time for the video via injection as well. 
    - [X] UI changes (I made the buttons weird and off to the side at some point for some reason, should change that back)
- [X] Research publishing Chrome Extensions 
- [X] everything should save every time anything is changed. 
    - [X] speed text 
    - [X] row text
    - [X] delete row 
    - [X] drop down 
    - [X] delete content section 
    - [X] add content section 
    - [X] add new row
- [X] Bug where getting the video to apply changes isn't always consisent (when navigating from internal pages, multiple videos in a row without a re-fresh ever).
    - [X] Solved. Looks like my timeout interval didn't die itself which was creating issues. 
    - [X] Sub bug here where it seems (navigating to a video and then to another both of which have times set for them results in both obtaining the same setYoutubeTimeDisplay() as the first video, must fix)
- [X] Bug where we sometimes get many repeated setYoutubeTimeDisplay() times for the new stuff
- [] Delete row not working again? (specifically deleting rows in the middle not working)
- [X] Case insensitivity
- [] injection of text part not working consistently
- [] pretty ifying

- [] Every save to storage should trigger the function that sets Speed in the likely case you're on a page you want to be a different speed already -> see background onChange handler
- [] Art assets
- [] Publish

Extra
- [] Make it perty 
















Current Context

It seems like we can't get background JS to wake up when we need it to be awake which is all the time or at least from the get go. 

If we do teh manifest direct version via the 

"content_scripts": [
        {
            "matches": [
                "https://www.youtube.com/*",
                "https://youtu.be/*",
                "https://www.youtube.com/watch*"
            ],
            "js": [
                "inject/inject.js"
            ],
            "css": [
                "inject/inject.css"
            ],
            "all_frames": true,
            "run_at": "document_end"
        }
    ]

It doesn't do well with internal navigation

Guess I should look more into how the other guy is actually setting his default speed for videos via content scripts and see if I can do something similar for my stuff. 



If for some reason we want the background script to be alive again add this code back into manifest.json

"background": {
        "service_worker": "background.js"
    },