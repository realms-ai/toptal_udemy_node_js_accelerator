class Department {
  private name: string;
  private defaultName: string = 'Navpreet';
  private employees: string[] = [];
  protected hrEmployees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  printName(): string {
    return this.defaultName + ' ' + this.name;
  }

  describe(this: Department): string {
    return this.name;
  }

  addEmployee(name: string): void {
    this.employees.push(name);
  }

  printEmployees() {
    return this.employees;
  }
}

const dept = new Department('Singh');
console.log('Department: ', dept.printName());

const copyDept = { printName: dept.printName };
console.log('Copy Department: ', copyDept.printName());
// Above function will display undefined undefined (Value is not passed just a function is passed)

const copyDept_1 = { name: 'Dummy', describe: dept.describe };
// console.log('Copy Department 1: ', copyDept_1.describe());

// *** Shorthand Initialization (with constructor) without defining class variable above the constructor ***
// ** Readonly properties: ** Which are not changed after initialization. e.g. ID could not be changed in any function of this class
class Dept {
  // private readonly id: string;
  // public name: string;
  private employees: string[] = [];
  protected hrEmployees: string[] = [];

  constructor(private readonly id: string, public name: string) {}

  printDetails() {
    return `ID: ${this.id}\nName: ${this.name}`;
  }

  addEmployee(name: string): void {
    this.employees.push(name);
  }

  printEmployees() {
    return this.employees;
  }
}

const dep = new Dept('1', 'Navpreet Singh');
console.log(dep.printDetails());

// *** INHERITANCE ***
class ITDept extends Dept {}

class HrDept extends Dept {
  private details: string[] = [];

  constructor(id: string, public admins: string[]) {
    // while using constructor in child class, always use super() with all parameters of parent class
    super(id, 'HR');
    this.details.push('test', 'test1');
  }

  addEmployee(name: string): void {
    this.hrEmployees.push(name);
  }

  printEmployees(): string[] {
    return this.hrEmployees;
  }
}

const itDept = new ITDept('10', "Amarjit Singh'");
console.log('\nIT Dept Details:\n', itDept.printDetails());

// *** Over-riding Properties and The "protected" Modifier
itDept.addEmployee('Test');
console.log('IT Employees: ', itDept.printEmployees());

// Protected Modifier (HR dept could access hREmployees parent variable)

// *** GETTERS AND SETTERS ***
class AccountDept extends Dept {
  private reports: string[] = [];

  constructor(id: string, name: string, r: string[]) {
    super(id, name);
    this.reports = r;
  }

  get mostRecentReport() {
    if (this.reports) return this.reports.slice(-1)[0];
    else throw new Error('No Report Found');
  }

  set mostRecentReport(value) {
    if (!value) throw new Error('Please pass in a valid value');
    this.reports.push(value);
  }
}

const accounting = new AccountDept('5', 'Account_1', ['last report']);

// Setting a new value to SETTER method
accounting.mostRecentReport = 'changed last report';

// Reading a GETTER method
console.log('Accounts Last Report: ', accounting.mostRecentReport);

// *** Static Methods and Properties ***
// Not accessible by functions of the class with THIS

class MarketingDept extends Dept {
  static info = 'Handles marketing of the company';

  static createEmployee(name: string) {
    return { name: name };
  }
}

console.log(
  'Marketing Dept creating Employee: ',
  MarketingDept.createEmployee('Test')
);

console.log('Marketing Dept Info: ', MarketingDept.info);

// *** Abstract Class ***
// when implementation is not possible in base class and all inherited classes needs to implement their own function as per their functionality
// Cannot be instantiated but has to be extended
abstract class Vehicle {
  abstract bio(): void;
}

class Car extends Vehicle {
  bio() {
    console.log('This is a car class');
  }
}

const car = new Car();
car.bio();

// *** Singletons & Private Constructors ***
// singleton pattern: ensures have single instance of a certain class

class SalesDept extends Dept {
  private static instance: SalesDept;

  private constructor(
    id: string,
    name: string,
    protected customerNames: string[]
  ) {
    super(id, name);
  }

  static getInstance() {
    if (!SalesDept.instance)
      this.instance = new SalesDept('1', 'Sales', ['a', 'b', 'c']);
    return this.instance;
  }

  printSalesDetails = (): void => {
    console.log(`
      Sales Dept:
      Name: ${this.name}
      Customer Names: ${this.customerNames}
    `);
  };
}

const sales_1 = SalesDept.getInstance();
const sales_2 = SalesDept.getInstance();
console.log(`
  Sales 1: ${sales_1}
  Sales 2: ${sales_2}
`);

sales_1.printSalesDetails();
