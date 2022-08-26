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

    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        btnTmpToggleNode.disabled = !tabs[0].url.includes("mail.google.com");
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

        if(!tabs[0].url.includes("mail.google.com")) return;

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

const phishingCommonSenses = [
    {
        ko: "Proofpoint가 조사한 조직의 83%가 2018년에 피싱 공격을 경험했다고 합니다.",
        en: "83% of organizations surveyed by Proofpoint said they experienced phishing attacks in 2018."
    },
    {
        ko: "알고 계시나요? 2021년 2분기에 차단된 악성 첨부파일은 약 34억 건이라고 합니다.",
        en: "Did you know? Mail Anti-Virus blocked 34,224,215 malicious attachments in Q2."
    },
    {
        ko: "택배사, 네이버, 카카오톡 등은 가장 많이 사칭되어 피싱메일에 이용됩니다.",
        en: "DHL, Microsoft, WhatsApp, etc are top phishing list of most imitated brands"
    },
    {
        ko: "코로나 19 이후 관련 피싱 메일이 매우 크게 증가 했다고 하네요.",
        en: "After COVID-19, related phishing emails increased significantly."
    },
];

function displayPhishingCommonSense() {
    let RandomArr = new Uint32Array(1);
    window.crypto.getRandomValues(RandomArr);

    document.getElementById("phishingCommonSenseArea").textContent = phishingCommonSenses[RandomArr[0]%phishingCommonSenses.length].ko;
}

displayPhishingCommonSense();

