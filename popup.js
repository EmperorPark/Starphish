const btnOffNode = document.getElementById('btnOff');
const btnRemoveLinkNode = document.getElementById('btnRemoveLink');
const btnRawNode = document.getElementById('btnRaw');
const btnTmpToggleNode = document.getElementById('btnTmpToggle');
const textTmpToggleNode = document.getElementById('textTmpToggle');
const iconToOriginalNode = document.getElementById('iconToOriginal');
const iconToSecurityModeNode = document.getElementById('iconToSecurityMode');
const btnUsageNode = document.getElementById('btnUsage');

let tmpCurrentSettingOriginalMode = false;

function sendStateCheckSignal() {
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id, 
            {
                data: {
                    message: "stateCheck"
                }
            }, 
            function(response) {
                if(response !== undefined) {
                    console.log(response);
                    tmpCurrentSettingOriginalMode = response.tmpCurrentSettingOriginalMode;
                }
            }
        );
    }); 
}

function constructOptions() {
    chrome.storage.sync.get('mode', (data) => {
        let currentMode = data.mode;
        console.log(currentMode);

        switch (currentMode) {
            case 0:
                clickBtnOff();
                break;
            case 1:
            default:
                clickBtnRemoveLink();
                break;
            case 2:
                clickBtnRaw();
                break;
        }

        sendStateCheckSignal();
    });
}

constructOptions();


function clickBtnOff(){
    btnOffNode.classList.add('btn-danger');
    btnRemoveLinkNode.classList.remove('btn-danger');
    btnRemoveLinkNode.classList.add('btn-secondary');
    btnRawNode.classList.remove('btn-danger');
    btnRawNode.classList.add('btn-secondary');

    let mode = 0;
    chrome.storage.sync.set({ mode: mode });
}

function clickBtnRemoveLink(){
    btnRemoveLinkNode.classList.add('btn-danger');
    btnOffNode.classList.remove('btn-danger');
    btnOffNode.classList.add('btn-secondary');
    btnRawNode.classList.remove('btn-danger');
    btnRawNode.classList.add('btn-secondary');

    let mode = 1;
    chrome.storage.sync.set({ mode: mode });
}

function clickBtnRaw(){
    btnRawNode.classList.add('btn-danger');
    btnRemoveLinkNode.classList.remove('btn-danger');
    btnRemoveLinkNode.classList.add('btn-secondary');
    btnOffNode.classList.remove('btn-danger');
    btnOffNode.classList.add('btn-secondary');

    let mode = 2;
    chrome.storage.sync.set({ mode: mode });
}

btnOffNode.addEventListener('click', clickBtnOff, false);
btnRemoveLinkNode.addEventListener('click', clickBtnRemoveLink, false);
btnRawNode.addEventListener('click', clickBtnRaw, false);

function tmpToggleBtnToSecurityMode() {
    btnTmpToggleNode.classList.remove('btn-warning');
    btnTmpToggleNode.classList.add('btn-success');
    textTmpToggleNode.textContent = '보안켜기'
    iconToOriginalNode.hidden = true;
    iconToSecurityModeNode.hidden = false;
}

function tmpToggleBtnToOriginalMode() {
    btnTmpToggleNode.classList.remove('btn-success');
    btnTmpToggleNode.classList.add('btn-warning');
    textTmpToggleNode.textContent = '원래대로'
    iconToOriginalNode.hidden = false;
    iconToSecurityModeNode.hidden = true;
}

function clickBtnTmpToggle() {
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id, 
            {
                data: {
                    message: "toggleMode"
                    , tmpCurrentSettingOriginalMode: tmpCurrentSettingOriginalMode
                }
            }, 
            function(response) {
                console.log(response);
                if(response != null) {
                    tmpCurrentSettingOriginalMode = response.tmpCurrentSettingOriginalMode;
                    if(tmpCurrentSettingOriginalMode) {
                        tmpToggleBtnToSecurityMode();
                    } else {
                        tmpToggleBtnToOriginalMode();
                    }
                }
            }
        );
    }); 
}


btnTmpToggleNode.addEventListener('click', clickBtnTmpToggle, false);

function clickUsageBtn() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

btnUsageNode.addEventListener('click', clickUsageBtn, false);


