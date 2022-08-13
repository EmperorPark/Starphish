let hello = "Hello World!"

console.log(hello);

setTimeout(()=>{
    document.querySelectorAll("body > div:nth-child(20) > div.nH > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) a").forEach(item => {
        item.removeAttribute("href");
        //console.log(item);
    });

}, 10000);