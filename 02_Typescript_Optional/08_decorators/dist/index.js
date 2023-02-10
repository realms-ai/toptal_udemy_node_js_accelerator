"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const space = '\n';
const Logger = (constructor) => {
    console.log('Logging...');
    console.log(constructor);
};
const Logger_1 = (logString) => {
    return (constructor) => {
        console.log('Log string: ', logString);
        console.log('Constructor: ', constructor);
    };
};
const WithTemplate = (template, hookId) => {
    return (_constructor) => {
        const hookEl = document.getElementById(hookId);
        if (hookEl)
            hookEl.innerHTML = template;
    };
};
let Person = class Person {
    name = 'Max';
    constructor() {
        console.log('Creating a person object...');
    }
};
Person = __decorate([
    Logger,
    Logger_1('Logging - Person'),
    WithTemplate('<h1 class="" id="app-heading">Changed with the decorator</h1>', 'app')
], Person);
const person = new Person();
console.log('Person: ', person);
const Log = (target, propertyName) => {
    console.log('Property Decorator!');
    console.log('Target: ', target);
    console.log('Property Name: ', propertyName);
};
const Log2 = (target, name, descriptor) => {
    console.log(space, 'Log - 2');
    console.log('Accessor decorator!');
    console.log('Target: ', target);
    console.log('Name: ', name);
    console.log('Descriptor: ', descriptor);
};
const Log3 = (target, name, descriptor) => {
    console.log(space, 'Log - 3');
    console.log('Method decorator!');
    console.log('Target: ', target);
    console.log('Name: ', name);
    console.log('Descriptor: ', descriptor);
};
const Log4 = (target, name, position) => {
    console.log(space, 'Log - 4');
    console.log('Parameter decorator!');
    console.log('Target: ', target);
    console.log('Name: ', name);
    console.log('Position: ', position);
};
class Product {
    title;
    _price;
    set price(val) {
        if (val > 0)
            this._price = val;
        else
            throw new Error('Invalid price - should be positive!');
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const WithTemplate2 = (template, hookId) => {
    console.log(space, 'TEMPLATE FACTORY');
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._args) {
                super();
                console.log('Rendering Template');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
};
let Person_1 = class Person_1 {
    name = 'Max';
    constructor() {
        console.log('Creating a person_1 object...');
    }
};
Person_1 = __decorate([
    WithTemplate2('<h1 class="" id="app-heading">Changed with the decorator</h1>', 'app')
], Person_1);
const person_1 = new Person_1();
console.log('Person_1: ', person_1);
console.log(space, 'AUTOBIND DECORATOR');
const Autobind = (_target, _methodname, descriptor) => {
    console.log('AutoBind Decorator');
    console.log('Target: ', _target);
    console.log('Method Name: ', _methodname);
    console.log('Descriptor: ', descriptor);
    const originalMethod = descriptor?.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    console.log('New Descriptor: ', adjDescriptor);
    return adjDescriptor;
};
class Printer {
    message = 'This works!';
    showMessage() {
        console.log(this.message);
    }
}
class Printer_1 {
    message = 'This works!';
    showMessage() {
        console.log('Autobind Decorator', this.message);
    }
}
__decorate([
    Autobind
], Printer_1.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector('button');
button?.addEventListener('click', p.showMessage);
button?.addEventListener('click', p.showMessage.bind(p));
const p1 = new Printer_1();
button?.addEventListener('click', p1.showMessage);
console.log(space, 'VALIDATION WITH DECORATORS');
const registeredValidators = {};
const Required = (target, propName) => {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [
            ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
            'required',
        ],
    };
    console.log('Required Validator');
    console.log('Target: ', target);
    console.log('PropName: ', propName);
    console.log('Registerered Validator: ', registeredValidators);
};
const PositiveNumber = (target, propName) => {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [
            ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
            'positive',
        ],
    };
    console.log('Positive Validator');
    console.log('Target: ', target);
    console.log('PropName: ', propName);
    console.log('Registerered Validator: ', registeredValidators);
};
const validate = (obj) => {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    console.log('In validate function: ');
    console.log('Object: ', obj);
    console.log('Constructor Name: ', obj.constructor.name);
    console.log('Validate Object: ', JSON.stringify(objValidatorConfig));
    let result = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            console.log('Prop: ', prop);
            console.log('Validator: ', validator);
            switch (validator) {
                case 'required':
                    result &&= !!obj[prop];
                    break;
                case 'positive':
                    result &&= obj[prop] > 0;
                    break;
            }
        }
    }
    return result;
};
class Course {
    title;
    price;
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const [title, price] = [titleEl.value, +priceEl.value];
    const createCourse = new Course(title, price);
    console.log('Validate: ', validate(createCourse));
    if (!validate(createCourse)) {
        alert('Invalid input, please try again');
        return;
    }
    console.log('Create Course: ', createCourse);
});
//# sourceMappingURL=index.js.map