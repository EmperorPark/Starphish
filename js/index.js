let mode = 1;
let tmpCurrentSettingOriginalMode = false;
const $$$ = new common();

let timer = setInterval(() => {}, 1000000);

function securityModeOn() {
    tmpCurrentSettingOriginalMode = false;
    console.log(mode);
    clearInterval(timer);
    if(mode === 1){
        timer = setInterval(() => {
            $$$.asideClickEventBinding();
            $$$.googleAmpMailChange();
            $$$.delHref();
        }, 500);
    } else if (mode === 2) {
        timer = setInterval(() => {
            $$$.asideClickEventBinding();
            $$$.emailContentToText($$$.emailContentAreaStr);
        }, 500);
    }
}

function securityModeOff() {
    clearInterval(timer);
    switch (mode) {
        case 0:
            break;
        case 1:
        default:
            $$$.restoreHref();
            break;
        case 2:
            $$$.restoreTextToOriginalContent();
            break;
    
    }
}

//////////////////////////////////
//this scope acts like entry point
/////////////////////////////////
chrome.storage.sync.get('mode', (data) => {
    mode = data.mode;
    console.log(mode);
    securityModeOn();
    $$$.asideClickEventBinding();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    //console.log(request, sender, sendResponse);
    
    if (request.data.message === "toggleMode" ){
        tmpCurrentSettingOriginalMode = request.data.tmpCurrentSettingOriginalMode
        if (!tmpCurrentSettingOriginalMode) {
            securityModeOff();
            tmpCurrentSettingOriginalMode = true;
        } else {
            securityModeOn();
            tmpCurrentSettingOriginalMode = false;
        }
        
        sendResponse({tmpCurrentSettingOriginalMode: tmpCurrentSettingOriginalMode});
    
    } else if(request.data.message === "stateCheck") { 
        sendResponse({tmpCurrentSettingOriginalMode: tmpCurrentSettingOriginalMode});
    }

    return true;
});

// function hasSomeParent(element, goalParent) {
//     console.log(element);
//     if (element === document.body) return false;
//     if (element === goalParent) return true;
//     return element.parentNode && hasSomeParent(element.parentNode, goalParent);
// }
// function asideClickEventBinding() {
//     console.log("binding test1");
//     document.body.addEventListener('click', (e) => {
//         console.log("binding test2");
//         if(hasSomeParent(e.target, document.querySelector($$$.gmailBoxListAreaStr)) ) {
//             securityModeOff();
//         }
//     });
// }

// asideClickEventBinding();