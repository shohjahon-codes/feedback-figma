function app(str = "") {
    if (str === str.split("").reverse().join("") ) {
        return true
    }else{
        return false
    }
}

function main(str = "") {
    let newStr = ""
for (let i = 0; i < str.length; i++) {
    newStr += str[(str.length - 1) - i]   
}        
if (str == newStr) {
    return true
}else{
    return false
}
}
main("salom")