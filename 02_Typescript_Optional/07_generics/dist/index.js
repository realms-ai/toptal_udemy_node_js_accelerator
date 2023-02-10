"use strict";
const space = '\n';
const names = [];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            resolve('Hi There');
        }
        catch (err) {
            reject(err);
        }
    }, 2000);
});
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            throw new Error('Intentional Error');
            resolve('Hi There');
        }
        catch (err) {
            reject(err);
        }
    }, 2000);
});
promise
    .then((data) => {
    console.log('Return Promise providing functions: ', data.split(' '));
})
    .catch((err) => {
    console.log('Error: ', err);
});
promise1
    .then((data) => {
    console.log('Return Promise providing functions: ', data.split(' '));
})
    .catch((err) => {
    console.log('Error: ', err);
});
console.log(space, 'CREATING A GENERIC FUNCTION');
const merge = (objA, objB) => {
    return Object.assign(objA, objB);
};
const mergeObj = merge({ name: 'Navpreet' }, { age: 30 });
console.log('Name: ', mergeObj.name);
console.log('Age: ', mergeObj.age);
function merge_1(objA, objB) {
    return Object.assign(objA, objB);
}
const merge2 = (objA, objB) => {
    return Object.assign(objA, objB);
};
const mergeObj1 = merge2({ name: 'Navpreet' }, { age: 30 });
console.log('Name: ', mergeObj1.name);
console.log('Age: ', mergeObj1.age);
const mergeObj2 = merge_1({ hobbies: ['Sports', 'Boxing', 'Running'] }, { name: 'Navpreet Singh', age: 30, gender: 'Male' });
console.log('Generic Type Obj2: ', mergeObj2);
const mergeObj3 = merge_1({ name: 'Navpreet' }, 30);
const countDesc = (ele) => {
    let desc = 'Got no value.';
    if (ele.length > 0) {
        desc = `Got ${ele.length} elements`;
    }
    return [ele, desc];
};
console.log(countDesc('Hi There'));
console.log(countDesc(['Hi', 'There']));
console.log(space, 'KEYOF CONSTRAINT');
const extractConvert = (obj, key) => {
    return `value ${obj[key]}`;
};
console.log(extractConvert({ name: 'Navpreet Singh', age: 30 }, 'name'));
console.log(space, 'GENERIC CLASSES');
class DStorage {
    data = [];
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DStorage();
textStorage.addItem('Item 1');
textStorage.addItem('Item 2');
textStorage.addItem('Item 3');
textStorage.removeItem('Item 2');
console.log('String Array: ', textStorage.getItems());
const numberStorage = new DStorage();
numberStorage.addItem(4);
numberStorage.addItem(6);
numberStorage.addItem(8);
numberStorage.removeItem(6);
console.log('Number Array: ', numberStorage.getItems());
console.log(space, 'GENERIC UTILITY TYPES');
const createCourseGoal = (courseGoal) => {
    return courseGoal;
};
const cg1 = createCourseGoal({ title: 'Title 1', description: 'Title 1 desc' });
const cg2 = createCourseGoal({
    title: 'Title 2',
    completeUntil: new Date('15 - 02 - 2023'),
});
const cg3 = createCourseGoal({
    description: 'Title 3 desc',
});
console.log(`CG 1: ${JSON.stringify(cg1)}\n CG2: ${JSON.stringify(cg2)}\n CG 3: ${JSON.stringify(cg3)}`);
const array = ['Ele 1', 'Ele 2'];
array.push('Ele 3');
console.log('Readonly Array: ', array);
//# sourceMappingURL=index.js.map