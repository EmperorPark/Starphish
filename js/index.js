let hello = "Hello World!"


console.log(hello);

const emailContentArea = "body > div:nth-child(20) > div.nH > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)";
const aInEmailContentArea = "body > div:nth-child(20) > div.nH > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) a";

function delHref() {
    document.querySelectorAll(aInEmailContentArea).forEach(item => {
        console.log("action");
        item.removeAttribute("href");
    });
}

elementToObserve = document.querySelector("body");

observer = new MutationObserver(function(mutationsList, observer) {
    console.log(mutationsList);
    if(document.querySelector(emailContentArea) !== null) {
        console.log("exist!!");
        delHref();
    } 
    // else {
    //     console.log("TT");
    // }
    
    
});

observer.observe(elementToObserve, {characterData: false, childList: true, attributes: false});


let timer = setInterval(()=>{
    delHref();
}, 100);

setTimeout(()=>{
    clearInterval(timer);
}, 10000);
