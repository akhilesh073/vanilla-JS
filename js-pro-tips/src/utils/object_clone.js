/*
How many ways to clone a object in javascript:


In JavaScript, you can deep copy a nested object in several ways, 
depending on your preferences and requirements. Deep copying ensures 
that not only the top-level object but all nested objects and their 
properties are duplicated in memory, creating a completely independent copy. 
Here are some common methods to achieve this:
*/

/**
 
1: Using the JSON.parse() and JSON.stringify() methods:
This method works well for objects that are JSON-serializable 
(i.e., they don't contain functions or circular references). 
It converts the object to a JSON string and then parses it to create a deep copy.

*/

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const originalObj1 = { foo: 1, bar: { baz: 2 } };
const copiedObj1 = deepCopy(originalObj1);

/**
 
2: Using a recursive function:
  This method recursively copies each property of the object, including nested objects and arrays. 
  It handles objects with functions and circular references.
 
  */

/**
 *
 * @param {*} obj given object to be copied
 * @param {*} seen map to hold visited nested object
 * @returns copy of the existing object
 */
function deepCopy(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (seen.has(obj)) {
    return seen.get(obj);
  }

  const copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key], seen);
    }
  }

  return copy;
}

const originalObj2 = { foo: 1, bar: { baz: 2 } };
const copiedObj2 = deepCopy(originalObj2);

console.log(copiedObj2);

/*
Using external libraries:
There are external libraries like Lodash that provide utility functions for deep copying objects.

*/

// const _ = require("lodash");

// const originalObj = { foo: 1, bar: { baz: 2 } };
// const copiedObj = _.cloneDeep(originalObj);

/**
Using the spread operator (for shallow copies):
The spread operator can be used for shallow copies of objects. 
While this doesn't create a deep copy, it creates a new top-level object and copies references to nested objects.
This may not be suitable for complex nested structures or objects with functions.
 */

const originalObj4 = { foo: 1, bar: { baz: 2 } };
const copiedObj4 = { ...originalObj };

/* 

Using the Structured Clone Algorithm (Node.js Only):
In Node.js, you can use the v8 module's StructuredClone API for deep copying objects. 
This method handles more complex objects and circular references.
*/

// const v8 = require('v8');

// function deepCopy(obj) {
//   return v8.deserialize(v8.serialize(obj));
// }

// const originalObj = { foo: 1, bar: { baz: 2 } };
// const copiedObj = deepCopy(originalObj);

/*
Using ES6 Spread Operator (Shallow Copy):
While the spread operator creates a new top-level object and copies 
references to nested objects (shallow copy), you can combine it with recursion to create a deep copy. 
This is a less efficient approach compared to other methods, but it works for shallow and moderately nested structures.

*/
function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepCopy);
  }

  return { ...obj };
}

const originalObj5 = { foo: 1, bar: { baz: 2 } };
const copiedObj5 = deepCopy(originalObj);

/*Using Object.assign() (Shallow Copy):
Object.assign() can also be used for shallow copying. 
It copies the enumerable properties from one or more source objects to a target object.
*/

const originalObj6 = { foo: 1, bar: { baz: 2 } };
const cloneObj6 = Object.assign({}, originalObj);

/*Using the Object.fromEntries() Method (Shallow Copy):
This method can be used to create a shallow copy of an object by converting 
it to an array of key-value pairs and then back to an object.
*/
const originalObj7 = { foo: 1, bar: { baz: 2 } };
const cloneObj7 = Object.fromEntries(Object.entries(originalObj));
