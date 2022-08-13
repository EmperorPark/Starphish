let hello = "Hello World!"

console.log(hello);

let aTags = getElementByXpath("/html/body/div[7]/div[3]/div/div[2]/div[2]/div/div/div/div/div[2]/div/div[1]/div").getElementsByTagName("a");

for (let i in aTags) {
    i.removeAttribute("href");
}