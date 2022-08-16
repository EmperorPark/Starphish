//공통 객체 파일

function common() {
    this.iframeList = [];
    this.ampRegExp = /(?<=<body.*>)(.*?)(?=<\/body>)/;
    this.emailContentAreaStr = "body > div:nth-child(20) > div.nH > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)";
};

common.prototype.delHref = function(areaStr) {
    
    // if(document.querySelector(areaStr) !== null) {
    //     if(document.querySelector("#starPhishAnnounce") !== null) document.querySelector("#starPhishAnnounce").remove();
    //     return;
    // }


    document.querySelectorAll(areaStr + " a[href]").forEach(item => {
        item.setAttribute("href_bak", item.getAttribute("href"));
        item.removeAttribute("href");

        item.setAttribute("data-toggle", "tooltip");
        item.setAttribute("data-placement", "bottom");
        item.setAttribute("title", "해당 링크는 StarPhish에 의해 비활성화 되었습니다.\n피싱으로 인한 사기 및 해킹 방지를 위해 링크를 사용하지 않고 메일의 목적을 판단할 수 있는 경우 링크를 사용하지 않는것이 권장됩니다.\n링크를 이용하셔야 하는 경우 해당 메일과 링크의 안전함을 판단 및 확인 후 링크를 이용하시기 바랍니다.\n(해당 링크: " + item.getAttribute("href_bak") + ")");
    });

    // let starPhishAnnounceNode = document.createElement("h1");
    // starPhishAnnounceNode.setAttribute("id", "starPhishAnnounce");
    // starPhishAnnounceNode.textContent = "해당 메일은 starPhish의 보안설정에 의해 변경되었습니다."
    
    // if(document.querySelector("#starPhishAnnounce") === null) {
    //     document.querySelector(areaStr).insertBefore(starPhishAnnounceNode, document.querySelector(areaStr).firstChild);
    // }
}

common.prototype.setIframeList = function(area) {

    if(area === null) {
        return;
    }

    let nowiframeArr;
    
    nowiframeArr = Array.from(area.querySelectorAll('iframe'));
    
    if(nowiframeArr.length > 0){
        for(let i = 0; i < nowiframeArr.length; i++){
            this.iframeList.push(nowiframeArr[i]);
        }

        for(let i = 0; i < nowiframeArr.length; i++){
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
    this.setIframeList(document.querySelector(this.emailContentAreaStr));
    for(let i = this.getIframeList().length - 1; i >= 0; i--){
        if(this.getIframeList()[i].getAttribute("id") === "amp-iframe") {
            document.querySelector(this.emailContentAreaStr).querySelector('iframe').outerHTML = decodeURIComponent(document.querySelector(this.emailContentAreaStr).querySelector('iframe').contentWindow.document.querySelector('iframe').getAttribute('src')).match(this.ampRegExp)[0]
        }
        this.getIframeList().pop();
    }
}


common.prototype.emailContentToXmp = function(areaStr) {
    let node = document.querySelector(areaStr);
    node.outerHTML = "<xmp>" + node.outerHTML + "</xmp>";
}