
let mode = 1;
// 0: off
// 1: remove link
// 2: html textContent
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ mode:mode });
});


chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.runtime.openOptionsPage();
    }
    else if(details.reason == "update"){
        chrome.runtime.openOptionsPage();
    }
});