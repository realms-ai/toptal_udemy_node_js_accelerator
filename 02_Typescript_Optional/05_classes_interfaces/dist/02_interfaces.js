"use strict";
const space = '\n';
let user1 = {
    name: 'Navpreet',
    age: 30,
    greet: (phrase) => {
        console.log('Phrase: ', phrase);
    },
    greet_1(phrase) {
        console.log('Phrase: ', phrase);
    },
};
user1.greet('Hi there - I am Navpreet Singh');
console.log(space, 'Interfaces with Classes');
class Person {
    name;
    age;
    gender;
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    greet = (phrase) => {
        console.log(`Hi ${this.name},\n ${phrase}`);
    };
    greet_1(phrase) {
        console.log(`Hi ${this.name} from greet_1,\n ${phrase}`);
    }
}
const p = new Person('Navpreet Singh', 30, 'male');
p.greet('I am a developer');
p.greet_1(' I am working on Node JS project');
console.log(space, 'Extended Interfaces', space, 'Optional parameters');
console.log(space, 'Interfaces as Fn Types');
let add;
add = (n1, n2) => {
    return n1 + n2;
};
console.log('Addition: ', add(1, 3));
let subtract;
subtract = (n1, n2) => {
    return n1 - n2;
};
console.log('Subtraction: ', subtract(5, 3));
//# sourceMappingURL=02_interfaces.js.map