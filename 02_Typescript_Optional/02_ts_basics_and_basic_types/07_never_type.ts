// NEVER TYPE
const generateError = (message: string, code: number): never => {
  throw { message: message, errorCode: code };
  // while (true) {}
};

console.log('Result: ', generateError('An Error Occured', 500));

console.log('test');
