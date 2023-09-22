const memoized = (fn) => {
  const cache = {};
  return (...args) => {
    const params = Array.prototype.slice.call(args);
    if (cache[params]) {
      return cache[params];
    } else {
      const result = fn(...args);
      cache[params] = result;
      return result;
    }
  };
};

// const toUpper = (str = "") => str.toUpperCase();

// const toUpperMemoized = memoized(toUpper);

// console.log(toUpperMemoized("abcdefg"));
// console.log(toUpperMemoized("abcdefg"));

// const makeFullName = (fName, lName) => `${fName} ${lName}`;
const reduceAdd = (numbers, initialValue) =>
  numbers.reduce((acc, curValue) => acc + curValue, initialValue);

// const memoizedFullName = memoized(makeFullName);
const memoizedReduceAdd = memoized(reduceAdd);

// memoizedFullName("Alfred", "Decosta");
// memoizedFullName("Alfred", "Decosta");

memoizedReduceAdd([1, 2, 3, 4, 5, 6], 5);
memoizedReduceAdd([1, 2, 3, 4, 5, 6], 5);
