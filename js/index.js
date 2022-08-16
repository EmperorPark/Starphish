let mode = 1;

const $$$ = new common();

let timer;

chrome.storage.sync.get('mode', (data) => {
    mode = data.mode;
    console.log(mode);
    if(mode === 1){
        console.log(mode);
        timer = setInterval(() => {
            $$$.googleAmpMailChange();
            $$$.delHref($$$.emailContentAreaStr);
        }, 500);
    
        // setTimeout(() => {
        //     clearInterval(timer);
        // }, 15000);
    }
});



