// 0: off
// 1: remove link
// 2: html raw
let mode = 1;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ mode:mode });
});