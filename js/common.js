//공통 객체 파일

function common() {
    this.iframeList = [];
    this.ampRegExp = /(?<=<body.*>)(.*?)(?=<\/body>)/;
    this.uriRegExp = /((http|https):\/\/)*((\w+)[.])+(aero|arpa|asia|biz|cat|com|coop|design|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|wiki|xxx|xyz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cw|cx|cy|cz|ccTLD|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|ccTLD|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sy|sx|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zr|zw)(\/(\w*))*$/;
    this.emailContentAreaStr = "body > div:nth-child(20) > div.nH > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)";
    this.gmailBoxListAreaStr = "body > div:nth-child(20) > div.nH > div > div:nth-child(2) > div:nth-child(1)";
};

common.prototype.delHref = function() {

    document.querySelectorAll(this.emailContentAreaStr + " a[href]").forEach(item => {

        let displayMessage;
        item.setAttribute("href_bak", item.getAttribute("href"));
        item.removeAttribute("href");

        item.setAttribute("data-toggle", "tooltip");
        item.setAttribute("data-placement", "bottom");

        displayMessage = "해당 링크는 StarPhish에 의해 비활성화 되었습니다.\n피싱으로 인한 사기 및 해킹 방지를 위해 링크를 사용하지 않고 메일의 목적을 판단할 수 있는 경우 링크를 사용하지 않는것이 권장됩니다.\n링크를 이용하셔야 하는 경우 해당 메일과 링크의 안전함을 판단 및 확인 후 링크를 이용하시기 바랍니다.\n(실제 링크: " + item.getAttribute("href_bak") + ")";

        if(this.uriRegExp.test(item.textContent) && item.textContent !== item.getAttribute("href_bak")) {
            displayMessage += "\n(표시링크: " + item.textContent + ")\n표시되는 링크와 실제 링크가 다릅니다!!!! 피싱에 주의하세요!!!";
        }
        item.setAttribute("title", displayMessage);

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