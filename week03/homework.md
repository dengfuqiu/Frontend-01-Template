## convertStringToNumber
这个没有做指数的处理
```javascript
function convertStringToNumber(str) {
  if (str === '' || str === null) {
    return 0;
  }
  if (str === undefined) {
    return NaN;
  }

  const isBinary = /^[+-]?0[Bb][01]+$/.test(str);

  const isOctal = /^[+-]?0[Oo][0-7]+$/.test(str);

  const isDecimal = /^(\.\d+|(0|[1-9]\d*)(\.\d*)?)([eE][-\+]?\d+)?$/.test(str);

  const isHex = /^[+-]?0[Xx][0-9a-fA-F]+$/.test(str);

  if (isBinary) hex = 2;
  if (isOctal) hex = 8;
  if (isDecimal) hex = 10;
  if (isHex) hex = 16;

  if (isBinary || isOctal || isHex) {
    str = str.slice(2);
  }

  if (!isHex) {
    const strArr = str.split('');
    let numberSum = 0;
    let i = 0;
    while (i < strArr.length) {
      numberSum = numberSum * hex;
      numberSum += strArr[i].codePointAt(0) - '0'.codePointAt(0);
      i++;
    }
    if (strArr[i] === '.') {
      i++;
    }
    let fraction = 1;
    while (i < strArr.length) {
      fraction /= hex
      numberSum += (strArr[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
      i++;
    }
    return numberSum;
  }
}
```

## convertNumberToString
```javascript
function convertNumberToString(number, radix) {
  let integer = Math.floor(number);
  let fraction = String(number).match(/\.\d+$/);
  if (fraction) {
    fraction = fraction[0].replace('.', '');
  }
  let string = '';
  while (integer > 0) {
    string = String(integer % radix) + string;
    integer = Math.floor(integer / radix);
  }
  return fraction ? `${string}.${fraction}` : string;
}
```
