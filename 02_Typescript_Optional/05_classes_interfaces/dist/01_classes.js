"use strict";
class Department {
    name;
    defaultName = 'Navpreet';
    employees = [];
    hrEmployees = [];
    constructor(n) {
        this.name = n;
    }
    printName() {
        return this.defaultName + ' ' + this.name;
    }
    describe() {
        return this.name;
    }
    addEmployee(name) {
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
const copyDept_1 = { name: 'Dummy', describe: dept.describe };
class Dept {
    id;
    name;
    employees = [];
    hrEmployees = [];
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    printDetails() {
        return `ID: ${this.id}\nName: ${this.name}`;
    }
    addEmployee(name) {
        this.employees.push(name);
    }
    printEmployees() {
        return this.employees;
    }
}
const dep = new Dept('1', 'Navpreet Singh');
console.log(dep.printDetails());
class ITDept extends Dept {
}
class HrDept extends Dept {
    admins;
    details = [];
    constructor(id, admins) {
        super(id, 'HR');
        this.admins = admins;
        this.details.push('test', 'test1');
    }
    addEmployee(name) {
        this.hrEmployees.push(name);
    }
    printEmployees() {
        return this.hrEmployees;
    }
}
const itDept = new ITDept('10', "Amarjit Singh'");
console.log('\nIT Dept Details:\n', itDept.printDetails());
itDept.addEmployee('Test');
console.log('IT Employees: ', itDept.printEmployees());
class AccountDept extends Dept {
    reports = [];
    constructor(id, name, r) {
        super(id, name);
        this.reports = r;
    }
    get mostRecentReport() {
        if (this.reports)
            return this.reports.slice(-1)[0];
        else
            throw new Error('No Report Found');
    }
    set mostRecentReport(value) {
        if (!value)
            throw new Error('Please pass in a valid value');
        this.reports.push(value);
    }
}
const accounting = new AccountDept('5', 'Account_1', ['last report']);
accounting.mostRecentReport = 'changed last report';
console.log('Accounts Last Report: ', accounting.mostRecentReport);
class MarketingDept extends Dept {
    static info = 'Handles marketing of the company';
    static createEmployee(name) {
        return { name: name };
    }
}
console.log('Marketing Dept creating Employee: ', MarketingDept.createEmployee('Test'));
console.log('Marketing Dept Info: ', MarketingDept.info);
class Vehicle {
}
class Car extends Vehicle {
    bio() {
        console.log('This is a car class');
    }
}
const car = new Car();
car.bio();
class SalesDept extends Dept {
    customerNames;
    static instance;
    constructor(id, name, customerNames) {
        super(id, name);
        this.customerNames = customerNames;
    }
    static getInstance() {
        if (!SalesDept.instance)
            this.instance = new SalesDept('1', 'Sales', ['a', 'b', 'c']);
        return this.instance;
    }
    printSalesDetails = () => {
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
//# sourceMappingURL=01_classes.js.map