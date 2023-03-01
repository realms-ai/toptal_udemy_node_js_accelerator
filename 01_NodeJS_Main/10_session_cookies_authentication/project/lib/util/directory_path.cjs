import path from 'path';

module.exports = path.dirname(
  require?.main?.filename || process?.mainModule?.filename || ''
);
