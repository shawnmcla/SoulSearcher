export function getRandomSeed(length = 8) {
    let ret = [];
    for (let i = 0; i < length; i++) {
        let r = Math.random();
        if (r > 0.7) {
            // char between '1' and '9'
            ret.push(String.fromCharCode(Math.floor(Math.random() * (57 - 49 + 1)) + 49));
        } else if (r > 0.45) {
            // char between 'A' and 'N'
            ret.push(String.fromCharCode(Math.floor(Math.random() * (78 - 65 + 1)) + 65));
        } else {
            // char between 'P' and 'Z'
            ret.push(String.fromCharCode(Math.floor(Math.random() * (90 - 80 + 1)) + 80));
        }
    }
    return ret.join("");
}
