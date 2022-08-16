const btnOffNode = document.getElementById('btnOff');
const btnRemoveLinkNode = document.getElementById('btnRemoveLink');
const btnRawNode = document.getElementById('btnRaw');
const btnTmpOffNode = document.getElementById('btnTmpOff');
const btnUsageNode = document.getElementById('btnUsage');

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


function clickBtnTmpOff() {
    if(btnTmpOffNode.classList.contains('btn-warning')) {
        btnTmpOffNode.classList.remove('btn-warning');
        btnTmpOffNode.classList.add('btn-success');
        btnTmpOffNode.textContent = '보안켜기'
    }
    else if(btnTmpOffNode.classList.contains('btn-success')) {
        btnTmpOffNode.classList.remove('btn-success');
        btnTmpOffNode.classList.add('btn-warning');
        btnTmpOffNode.textContent = '원래대로'
    }
    
    
}

btnTmpOffNode.addEventListener('click', clickBtnTmpOff, false);

function clickUsageBtn() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

btnUsageNode.addEventListener('click', clickUsageBtn, false);


