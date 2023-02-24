let string = 'проверяемая строка';
let string2 = 'проверяемая строка строкулечка';

function getLength(sentence, maxLength) {
  if (sentence.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}

console.log(getLength(string));
console.log(getLength(string, 20));
console.log(getLength(string2, 18));
console.log(getLength(string, 10));

function isPalindrome(string) {
  string = string.toLowerCase();

  if (string === string.split('').reverse().join('')){
    return true;
  } else {
    return false;
  }
}

console.log(isPalindrome("ДоВод"));
console.log(isPalindrome("ДоВоды"));
console.log(isPalindrome("22022022"));
console.log(isPalindrome("топот"));

function parsedSignSentence(sentense) {
  let result = '';

  for( let i = 0; i < sentense.length; i++ ) {
    let sign = sentense[i];
    let parsedSign = parseInt(sign, 10);

    if (!isNaN(parsedSign)){
        result = result + sentense[i];
      }
    }
 return parseInt(result, 10);
}

console.log(parsedSignSentence('2023 год'))
console.log(parsedSignSentence('ECMAScript 2022'))
console.log(parsedSignSentence('1 кефир, 0.5 батона'))
console.log(parsedSignSentence('агент 007'))
console.log(parsedSignSentence('а я томат'))

function addSymbol(string, min, pad) {
  if(string.length >= min) {
    return string;
  } else {
    let diff = min - string.length;
    let result = string;
    for(let i = 1; i <= diff; i++) {
      if((pad + result).length > min) {
       let maxPadLength = (pad + result).length - min;
       let shortPad = pad.slice(0, -maxPadLength);
       result = shortPad + result;
        break;
      }
      result = pad + result;
    }
    return result;
  }

}

console.log(addSymbol('1', 2, '0'));
console.log(addSymbol('1', 4, '0'));
console.log(addSymbol('q', 4, 'werty'));
console.log(addSymbol('q', 4, 'we'));
console.log(addSymbol('qwerty', 4, '0'));
