//공통함수파일

function common() {

}

const $$$ = common;

$$$.prototype.delHref = function(area) {
    document.querySelectorAll(area).forEach(item => {
        console.log("action");
        item.removeAttribute("href");
    });
}

function delHref(area) {
    document.querySelectorAll(area).forEach(item => {
        console.log("action");
        item.removeAttribute("href");
    });
}

$$$.prototype.ifameDelHref = function() {
    document.querySelectorAll('iframe').forEach( item => {
        let iframeBody = item.contentWindow.document.body.querySelector('body');
        delHref(iframeBody);
        //ifameDelHref();
    });
}

function ifameDelHref() {
    document.querySelectorAll('iframe').forEach( item => {
        let iframeBody = item.contentWindow.document.body.querySelector('body');
        delHref(iframeBody);
        //ifameDelHref();
    });
}

