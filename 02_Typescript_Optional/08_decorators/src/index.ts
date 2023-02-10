const space = '\n';
const Logger = (constructor: Function): void => {
  console.log('Logging...');
  console.log(constructor);
};

const Logger_1 = (logString: string): Function => {
  return (constructor: Function): void => {
    console.log('Log string: ', logString);
    console.log('Constructor: ', constructor);
  };
};

const WithTemplate = (template: string, hookId: string): Function => {
  // _constructor tells the function that this is parameter will be received but not needed by adding "_" before the parameter
  return (_constructor: Function): void => {
    const hookEl = document.getElementById(hookId);
    if (hookEl) hookEl.innerHTML = template;
  };
};

// Bottom up decorator run
@Logger
@Logger_1('Logging - Person')
@WithTemplate(
  '<h1 class="" id="app-heading">Changed with the decorator</h1>',
  'app'
)
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating a person object...');
  }
}

const person = new Person();

console.log('Person: ', person);

const Log = (target: any, propertyName: string | symbol) => {
  console.log('Property Decorator!');
  console.log('Target: ', target);
  console.log('Property Name: ', propertyName);
};

const Log2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
  console.log(space, 'Log - 2');
  console.log('Accessor decorator!');
  console.log('Target: ', target);
  console.log('Name: ', name);
  console.log('Descriptor: ', descriptor);
};

const Log3 = (
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  console.log(space, 'Log - 3');
  console.log('Method decorator!');
  console.log('Target: ', target);
  console.log('Name: ', name);
  console.log('Descriptor: ', descriptor);
};

const Log4 = (target: any, name: string | Symbol, position: number) => {
  console.log(space, 'Log - 4');
  console.log('Parameter decorator!');
  console.log('Target: ', target);
  console.log('Name: ', name);
  console.log('Position: ', position);
};

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) this._price = val;
    else throw new Error('Invalid price - should be positive!');
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// Returning and changing a Class in a Class Decorator
const WithTemplate2 = (template: string, hookId: string) => {
  console.log(space, 'TEMPLATE FACTORY');
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // Run the logic when class is initiated
    return class extends originalConstructor {
      constructor(..._args: any[]) {
        super();
        console.log('Rendering Template');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
};

@WithTemplate2(
  '<h1 class="" id="app-heading">Changed with the decorator</h1>',
  'app'
)
class Person_1 {
  name = 'Max';

  constructor() {
    console.log('Creating a person_1 object...');
  }
}

const person_1 = new Person_1();

console.log('Person_1: ', person_1);

// AUTOBIND DECORATOR
console.log(space, 'AUTOBIND DECORATOR');

const Autobind = (
  _target: any,
  _methodname: string | Symbol | number,
  descriptor: PropertyDescriptor
) => {
  console.log('AutoBind Decorator');
  console.log('Target: ', _target);
  console.log('Method Name: ', _methodname);
  console.log('Descriptor: ', descriptor);
  const originalMethod = descriptor?.value;
  const adjDescriptor: PropertyDescriptor = {
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

  @Autobind
  showMessage() {
    console.log('Autobind Decorator', this.message);
  }
}

const p = new Printer();
const button = document.querySelector('button');
// Below function will display UNDEFINED as showMessage is not referring to "p". We have to bind it
button?.addEventListener('click', p.showMessage);
button?.addEventListener('click', p.showMessage.bind(p));

const p1 = new Printer_1();
button?.addEventListener('click', p1.showMessage);

// VALIDATION WITH DECORATORS
console.log(space, 'VALIDATION WITH DECORATORS');

interface ValidatorConfig {
  [property: string]: {
    [validatorProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

const Required = (target: any, propName: string) => {
  // if (!registeredValidators[target.constructor.name])
  //   registeredValidators[target.constructor.name] = {};
  // if (!registeredValidators[target.constructor.name][propName])
  //   registeredValidators[target.constructor.name][propName] = [];
  // registeredValidators[target.constructor.name][propName].push('required');
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

const PositiveNumber = (target: any, propName: string) => {
  // if (!registeredValidators[target.constructor.name])
  //   registeredValidators[target.constructor.name] = {};
  // if (!registeredValidators[target.constructor.name][propName])
  //   registeredValidators[target.constructor.name][propName] = [];
  // registeredValidators[target.constructor.name][propName].push('positive');
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

const validate = (obj: any) => {
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
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form');
courseForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const [title, price] = [titleEl.value, +priceEl.value];

  // We can create empty courses with value less than 0
  // Using decorators to not allow to do so
  const createCourse = new Course(title, price);
  console.log('Validate: ', validate(createCourse));
  if (!validate(createCourse)) {
    alert('Invalid input, please try again');
    return;
  }
  console.log('Create Course: ', createCourse);
});
