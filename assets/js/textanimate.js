let divTyping = document.getElementById('site-description');
let i = 0,
    flag = false,
    lastChar = '',
    timer = 0,
    str = divTyping.innerText,
    typingSpeed = 200,
    updatingSpeed = 300;

function typing() {
    if (i <= str.length) {
        divTyping.innerText = str.slice(0, i++) + '_';
        timer = setTimeout(typing, typingSpeed);
    } else {
        divTyping.innerText = str; //结束打字,移除_光标
        clearTimeout(timer);
        i = 0;
        updating();
    }
}

function updating() {
    if (i === 0) {
        //从头来过
        str = replaceStr(str, flag ? str.length - 1 : 　str.length, lastChar);
        lastChar = str[0];
        str = replaceStr(str, 0, reverseChar(str[0]));
    } else if (i === str.length - 1) {
        //最后
        str = replaceStr(str, i - 1, lastChar);
        lastChar = str[str.length - 1];
        str = replaceStr(str, str.length - 1, reverseChar(str[str.length - 1]));
        flag = true;
        i = -1;
    } else {
        //中间
        str = replaceStr(str, i - 1, lastChar);
        lastChar = str[i];
        str = replaceStr(str, i, reverseChar(str[i]));
    }
    i++;
    divTyping.innerText = str;
    timer = setTimeout(updating, updatingSpeed);
}

function replaceStr(str, index, char) {
    return str.substring(0, index) + char + str.substring(index + 1);
}

function isUpperCase(ch) {
    return ch >= 'A' && ch <= 'Z';
}

function isLowerCase(ch) {
    return ch >= 'a' && ch <= 'z';
}

function reverseChar(ch) {
    if (isUpperCase(ch)) return ch.toLowerCase();
    else if (isLowerCase(ch)) return ch.toUpperCase();
    else return ' ';
}