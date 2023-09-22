/* how to make an object immutable in javascript
In JavaScript, you can make an object immutable by preventing any changes 
to its properties and values once it is created. Immutability is a useful
 concept for ensuring data consistency and preventing unintentional modifications.
 Here are some ways to make an object immutable:
*/

/*
Using Object.freeze():
The Object.freeze() method can be used to make an object and its properties immutable. 
Once an object is frozen, you cannot add, delete, or modify its properties or their values. 
This method only provides shallow immutability, meaning it affects only the top-level properties of the object.

*/

const immutableObject1 = Object.freeze({ foo: 1, bar: 2, bag: { pbag: 10 } });

// Trying to modify properties will have no effect and won't throw an error
immutableObject1.foo = 3; // Won't change the value
immutableObject1.baz = 4; // Won't add a new property
immutableObject1.bag.pbag = 20;
console.log(immutableObject1);

/*
    Using a Library like Immutable.js:
Libraries like Immutable.js provide data structures that are designed for immutability. 
These libraries offer a range of data structures, including Maps and Lists, which are 
fully immutable and allow you to work with data in an immutable way.

Example with Immutable.js:
*/

// const { Map } = require("immutable");

// const immutableMap = Map({ foo: 1, bar: 2 });

// // Creating a new Map with an updated value
// const updatedMap = immutableMap.set("foo", 3);

// // The original Map remains unchanged
// console.log(immutableMap.get("foo")); // 1
// console.log(updatedMap.get("foo")); // 3

/*
Using Object Literals with Object.defineProperty():
You can create an immutable object by defining its properties using Object.defineProperty(). 
This approach allows you to control access and modification of object properties.
*/

const immutableObject2 = { foo: { bar: 10 } };

Object.defineProperty(immutableObject2, "foo", {
  value: 1,
  writable: false, // Prevents changes to the property value
  configurable: false, // Prevents changes to property attributes
});

// Trying to modify the property will have no effect
immutableObject2.foo = 2; // Won't change the value
immutableObject2.foo.bar = 20;
console.log(immutableObject2);

/*
Using ES6 Proxies:
ES6 Proxies can be used to create an object with custom behavior that prevents property modifications. 
You can intercept property access and mutation operations.
*/

const immutableObject3 = new Proxy(
  { foo: 1, bar: 2 },
  {
    set: function (target, key, value) {
      throw new Error(`Cannot modify property '${key}'`);
    },
  }
);

// Trying to modify properties will throw an error
immutableObject3.foo = 3; // Throws an error
immutableObject3.baz = 4; // Throws an Error

log(immutableObject3);

/*

Using ES6 Getters:
ES6 getter methods allow you to define read-only properties on an object. These properties can't be changed directly.
*/

const immutableObject = {
  _foo: 1,
  get foo() {
    return this._foo;
  },
};

// Trying to modify the property will have no effect
immutableObject.foo = 2; // Won't change the value
