"use strict";
// Literal Type
const combine_1 = (i1, i2, resultConversion) => {
    let result;
    if (typeof i1 === 'number' &&
        typeof i2 === 'number' &&
        resultConversion === 'number')
        result = +i1 + +i2;
    else
        result = i1.toString() + i2.toString();
    return result;
};
// Returning number
console.log(combine_1(5, 6, 'number'));
// Returning number as string
console.log(combine_1(5, 6, 'string'));
// Returning String
console.log(combine_1('Navpreet', 'Singh', 'string'));
