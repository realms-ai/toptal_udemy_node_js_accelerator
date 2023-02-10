"use strict";
const space = '\n';
console.log('Intersection Types');
const e1 = {
    name: 'Navpreet Singh',
    privileges: ['create-server'],
    startDate: new Date(),
};
const e2 = {
    name: 'Navpreet Singh',
    privileges: ['create-server'],
    startDate: new Date(),
};
console.log(space, 'Type Guards');
const add = (a, b) => {
    if (typeof a === 'string' || typeof b === 'string')
        return a.toString() + b.toString();
    return a + b;
};
const printEmpInfo = (emp) => {
    console.log('Name: ', emp.name);
    if ('privileges' in emp)
        console.log('Privileges: ', emp.privileges);
    if ('startDate' in emp)
        console.log('Start Date: ', emp.startDate);
};
printEmpInfo(e1);
console.log(space, 'Print Emp Info without privileges');
printEmpInfo({ name: 'Navpreet Singh', startDate: new Date('10-12-2020') });
console.log(space, 'InstanceOf Type Guard in Classes');
class Car {
    drive() {
        console.log('Driving....');
    }
}
class Truck {
    drive() {
        console.log('Driving...');
    }
    loadCargo(amount) {
        console.log('Loading cargo ...', amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
const useVehicle = (vehicle) => {
    vehicle.drive();
    if ('loadCargo' in vehicle)
        vehicle.loadCargo(1000);
    if (vehicle instanceof Truck)
        vehicle.loadCargo(2000);
};
console.log('Car');
useVehicle(v1);
console.log('Truck');
useVehicle(v2);
console.log(space, 'Discriminated Unions');
const moveAnimal = (animal) => {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving with speed: ', speed);
};
console.log('Bird');
moveAnimal({ type: 'bird', flyingSpeed: 1000 });
console.log('Horse');
moveAnimal({ type: 'horse', runningSpeed: 2000 });
console.log(space, 'Type Casting');
const paragraph = document.querySelector('p');
const para = document.getElementById('message-output');
para.textContent = 'Hi There from TS';
const inp = document.getElementById('user-input');
const inp_1 = document.getElementById('user-input');
const inp_2 = document.getElementById('user-input');
inp.value = 'Value from TS';
inp_2.value = 'Alternative to use !';
console.log(space, 'INDEX PROPERTIES');
const errorBag = {
    email: 'Not a valid email',
    username: 'Must start with a character',
};
console.log(space, 'FUNCTION OVERLOADS');
function add_1(a, b) {
    if (typeof a === 'string' || typeof b === 'string')
        return `${a.toString()} ${b.toString()}`;
    return a + b;
}
let result = add_1('Navpreet', 'Singh');
result = result.split(' ');
let result1 = add_1(5, 'Singh');
result1 = result1.split(' ');
let result2 = add_1(5, 6);
if (typeof result2 === 'string')
    result2 = result2?.split(' ');
console.log('Results: ', result, result1, result2);
console.log(space, 'OPTIONAL CHAINING');
const userData = {
    id: 'u1',
    name: 'Navpreet',
    job: {
        title: 'CEO',
        description: 'My own company',
    },
};
console.log('Job info(not available): ', userData?.job?.info);
console.log('Job Desc: ', userData?.job?.description);
console.log(space, 'NULLISH COALESCING (??)');
const userInput = null;
const userInput1 = undefined;
const userInput2 = '';
const storedData = userInput || 'DEFAULT';
const storedData1 = userInput1 || 'DEFAULT';
const storedData2 = userInput2 || 'DEFAULT';
const storedData_1 = userInput ?? 'DEFAULT';
const storedData_11 = userInput1 ?? 'DEFAULT';
const storedData_12 = userInput2 ?? 'DEFAULT';
console.log(`Results with nullish coalescing: ${storedData_1} ${storedData_11} ${storedData_12}`);
//# sourceMappingURL=index.js.map