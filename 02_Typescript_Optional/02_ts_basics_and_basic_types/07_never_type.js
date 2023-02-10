"use strict";
// NEVER TYPE
const generateError = (message, code) => {
    throw { message: message, errorCode: code };
    // while (true) {}
};
console.log('Result: ', generateError('An Error Occured', 500));
console.log('test');
