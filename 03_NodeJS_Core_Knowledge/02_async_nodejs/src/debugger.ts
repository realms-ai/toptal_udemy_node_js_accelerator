declare var x: number;

global.x = 5;

setTimeout(() => {
  let a: string = 'Hi There';
  debugger;
  console.log('world');
}, 1000);

console.log('Hello');
