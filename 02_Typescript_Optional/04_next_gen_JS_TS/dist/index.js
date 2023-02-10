"use strict";
const printOutput = (output) => console.log(output);
const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', (event) => console.log(event));
}
const add = (a, b = 1) => a + b;
printOutput(add(6));
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
const addR = (...arg) => {
    return arg.reduce((currResult, currValue) => {
        return currResult + currValue;
    }, 0);
};
console.log(addR(1, 2, 3, 4, 5, 6, 7, 8, 9));
const [h1, h2, ...rh] = hobbies;
console.log('Array Destructured (Hobbies): ', h1, h2, rh);
const { name: username, age } = person;
console.log('Object Destructured (PERSON): ', username, age);
//# sourceMappingURL=index.js.map