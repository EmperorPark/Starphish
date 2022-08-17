//공통 객체 파일

function common() {
    this.iframeList = [];
    this.ampRegExp = /(?<=<body.*>)(.*?)(?=<\/body>)/;
    this.emailContentAreaStr = "body > div:nth-child(20) > div.nH > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)";
    this.gmailBoxListAreaStr = "body > div:nth-child(20) > div.nH > div > div:nth-child(2) > div:nth-child(1)";
};

common.prototype.delHref = function() {

    document.querySelectorAll(this.emailContentAreaStr + " a[href]").forEach(item => {
        item.setAttribute("href_bak", item.getAttribute("href"));
        item.removeAttribute("href");

        item.setAttribute("data-toggle", "tooltip");
        item.setAttribute("data-placement", "bottom");
        item.setAttribute("title", "해당 링크는 StarPhish에 의해 비활성화 되었습니다.\n피싱으로 인한 사기 및 해킹 방지를 위해 링크를 사용하지 않고 메일의 목적을 판단할 수 있는 경우 링크를 사용하지 않는것이 권장됩니다.\n링크를 이용하셔야 하는 경우 해당 메일과 링크의 안전함을 판단 및 확인 후 링크를 이용하시기 바랍니다.\n(해당 링크: " + item.getAttribute("href_bak") + ")");
    });

}

common.prototype.restoreHref = function() {

    document.querySelectorAll(this.emailContentAreaStr + " a[href_bak]").forEach(item => {
        item.setAttribute("href", item.getAttribute("href_bak"));
        item.removeAttribute("href_bak");

        item.removeAttribute("data-toggle");
        item.removeAttribute("data-placement");
        item.removeAttribute("title");
    });

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


common.prototype.emailContentToText = function() {

    let node = document.querySelector(this.emailContentAreaStr);

    if(node.querySelector("span[data-thread-id]" !== null)) {
        return;
    }


    node.hidden = true;
    //console.log(document.getElementById("convertText"));
    if(document.getElementById("convertText") === null){
        newNode = document.createElement("div");
        newNode.id = "convertText";
        node.insertAdjacentElement('afterend', newNode);
    }
    if(document.getElementById("convertText").textContent.trim().length === 0) {
        document.getElementById("convertText").textContent = node.textContent;
    }
    
}


common.prototype.restoreTextToOriginalContent = function() {
    if(document.getElementById("convertText") !== null){
        document.getElementById("convertText").remove();
    }
    
    let originalNode = document.querySelector(this.emailContentAreaStr);
    originalNode.hidden = false;
    
}

common.prototype.asideClickEventBinding = function() {

    document.querySelectorAll(this.gmailBoxListAreaStr + " a[href]").forEach(item => {
        if(item.getAttribute("href") !== "javascript:securityModeOff();return false;") {
            item.setAttribute("href", "javascript:securityModeOff();return false;");
        }
    });

}