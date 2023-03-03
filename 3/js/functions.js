function isLessThen(sentence, maxLength) {
  if (sentence.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}
isLessThen('проверяемая строка', 20);

function isPalindrome(string) {
  string = string.toLowerCase();

  if (string === string.split('').reverse().join('')){
    return true;
  } else {
    return false;
  }
}
isPalindrome('ДоВод');

function parsedSignSentence(sentense) {
  let result = '';

  for(let i = 0; i < sentense.length; i++) {
    const sign = sentense[i];
    const parsedSign = parseInt(sign, 10);

    if (!isNaN(parsedSign)){
      result = result + sentense[i];
    }
  }
  return parseInt(result, 10);
}
parsedSignSentence('2023 год');

function addSymbol(string, min, pad) {
  if(string.length >= min) {
    return string;
  } else {
    const diff = min - string.length;
    let result = string;
    for(let i = 1; i <= diff; i++) {
      if((pad + result).length > min) {
        const maxPadLength = (pad + result).length - min;
        const shortPad = pad.slice(0, -maxPadLength);
        result = shortPad + result;
        break;
      }
      result = pad + result;
    }
    return result;
  }

}
addSymbol('1', 2, '0');
