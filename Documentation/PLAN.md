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
- [-] Research basics of Chrome Extension programming
    - https://www.youtube.com/watch?v=uV4L-wcnK3Y
    - https://www.youtube.com/watch?v=wHZCYi1K664
    - https://developer.chrome.com/docs/extensions/mv3/getstarted/
- [-] Look at source for similar-ish projects
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
    - [-] Make default/initial structure for popup.html
    - [] Make js re-creation so I can add more rows and such and get that working with buttons in popup
    - [] Save data from popup on popup close
    - [] load data to popup on popup open
    - [] on popup close re-run background script to apply changes to open windows
    - [] make communication between frontend and backend via chrome messages so I can apply backend code based on black list from frontend
- [ ] Create icons and put into form
- [ ] Research publishing Chrome Extensions 