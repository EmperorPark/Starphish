//공통 객체/함수/변수 파일

function common() {
    this.iframeList = [];
    this.ampRegExp = /(?<=<body>)(.*?)(?=<\/body>)/;
    this.emailContentArea = "body > div:nth-child(20) > div.nH > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)";
    
};

common.prototype.delHref = function(area) {
    
    if(area === null) return;

    document.querySelectorAll(area + " a[href]").forEach(item => {
        item.setAttribute("href_bak", item.getAttribute("href"));
        item.removeAttribute("href");

        item.setAttribute("data-toggle", "tooltip");
        item.setAttribute("data-placement", "bottom");
        item.setAttribute("title", "해당 링크는 StarPhish에 의해 비활성화 되었습니다.\n링크를 사용하지 않고 메일의 목적을 판단할 수 있는 경우 링크를 사용하는 것은 권장되지 않습니다.\n링크를 이용하셔야 하는 경우 해당 메일과 링크의 안전함을 판단 및 확인 후 링크를 이용하시기 바랍니다.\n(" + item.getAttribute("href_bak") + ")");
    });
}
common.prototype.setIframeList = function(area) {

    if(area === null) return;


    //console.log("test1");
    //console.log(area);
    let nowiframeArr;
    
    nowiframeArr = Array.from(area.querySelectorAll('iframe'));
    
    //console.log(nowiframeArr);
    if(nowiframeArr.length > 0){
        for(let i = 0; i < nowiframeArr.length; i++){
            //console.log
            this.iframeList.push(nowiframeArr[i]);
        }

        for(let i = 0; i < nowiframeArr.length; i++){
            //console.log("test2");
            //console.log(nowiframeArr[i]);

            try {
                this.setIframeList(nowiframeArr[i].contentWindow.document);
            } catch (e) {
                if(e instanceof DOMException) {
                    return;
                } else {
                    throw(e);
                }
            }
            
        }
    }
}

common.prototype.getIframeList = function() {
    return this.iframeList;
}


common.prototype.googleAmpMailChange = function() {
    //console.log('googleAmpMailChange');
    this.setIframeList(document.querySelector(this.emailContentArea));
    for(let i = this.getIframeList().length - 1; i >= 0; i--){
        if(this.getIframeList()[i].getAttribute("id") === "amp-iframe") {
            document.querySelector(this.emailContentArea).querySelector('iframe').outerHTML = decodeURIComponent(document.querySelector(this.emailContentArea).querySelector('iframe').contentWindow.document.querySelector('iframe').getAttribute('src')).match(this.ampRegExp)[0]
        }
        this.getIframeList().pop();
    }
}


