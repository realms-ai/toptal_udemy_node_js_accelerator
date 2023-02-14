import path from 'path';
console.log('Path: ', path.dirname(require?.main?.filename));
console.log('Path: ', path.dirname(process?.mainModule?.filename));
module.exports = path.dirname(require?.main?.filename);
