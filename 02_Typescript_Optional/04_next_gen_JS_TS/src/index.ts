// export {};
// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;
// global.document = new JSDOM(html).window.document;

// Arrow Functions
const printOutput: (a: number | string) => void = (output) =>
  console.log(output);

const button = document.querySelector('button')! as HTMLButtonElement;

if (button) {
  button.addEventListener('click', (event) => console.log(event));
}

// Default Function Parameters (params should always be defined at the last)

const add = (a: number, b: number = 1) => a + b;
printOutput(add(6));

// Spread Operator
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(hobbies[0], hobbies[1]);
activeHobbies.push(...hobbies);
console.log('Active Hobbies: ', activeHobbies);

const person = {
  name: 'Max',
  age: 30,
};
const copiedPerson = { ...person };

// Rest Operator
const addR = (...arg: number[]): number => {
  // let sum = 0;
  // for (let val of arg) {
  //   sum += val;
  // }
  // return sum;

  return arg.reduce((currResult, currValue) => {
    return currResult + currValue;
  }, 0);
};

console.log(addR(1, 2, 3, 4, 5, 6, 7, 8, 9));

// Arrays and Object Destructuring
const [h1, h2, ...rh] = hobbies;
console.log('Array Destructured (Hobbies): ', h1, h2, rh);

const { name: username, age } = person;
console.log('Object Destructured (PERSON): ', username, age);
