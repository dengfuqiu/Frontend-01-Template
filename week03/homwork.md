## convertStringToNumber
```javascript
function convertStringToNumber (str) {
  const isBinary = /^[+-]?0[bB][01]+$/.test(str);
  const isOctal = /^[+-]?0[oO][0-7]+$/.test(str);
  const isDecimal = /^[+-]?(\.\d+|(0|[1-9]\d*)(\.\d*)?)([eE][-\+]?\d+)?$/.test(str);
  const isHex = /^[+-]?0[xX][0-9a-fA-F]+$/.test(str);
  let hex;

  if (isBinary) hex = 2;
  if (isOctal) hex = 8;
  if (isDecimal) hex = 10;
  if (isHex) hex = 16;
  if (isBinary || isOctal || isHex) {
    str = str.slice(2);
  }

  let strArr = str.split('');
  let numberStr = 0;
  let i = 0;
  while (i < strArr.length && strArr[i] !== '.') {
    numberStr = numberStr * hex;
    numberStr += strArr[i].codePointAt(0) - '0'.codePointAt(0);
    i++;
  }
  if (strArr[i] === '.') {
    i++;
  }
  let fraction = 1;
  while (i < strArr.length) {
    fraction /= hex;
    numberStr += (strArr[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
    i++;
  }
  return numberStr;
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
