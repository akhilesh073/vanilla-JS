/* 
Product of Array except itself
Array as input. arr=[2,4,6,8]
output: [productOfRemainingElements(4,6,8), productOfRemainingElements(2,6,8), productOfRemainingElements(2,3,4,8), productOfRemainingElements(2,4,6)]

 */

// Approach 1: using two loops: complexity O(n2)

/**
 *
 * @param {number[]} arr - given array
 * @param {number} index - index of the element
 * @returns {number[]}  product of rest of the elements except current index
 */
function productOfRemainingElements(arr, index) {
  let result = 1;
  for (let i = 0; i < arr.length; i++) {
    if (i == index) continue;
    result = result * arr[i];
  }
  return result;
}
let result = [];
let tempResult = 1;
function productOfRemainingElementRecursion(arr) {
  if (!Array.isArray(arr) || arr.length < 1) return;
  if (arr.length === 2) return arr[0] * arr[1];
  for (let i = 0; i < arr.length; i++) {
    return (
      productOfRemainingElementRecursion(arr.slice(0, i)) *
      productOfRemainingElementRecursion(arr.slice(i + 1, arr.length - 1))
    );
  }
}
/**
 * @param {number} arr - Input array
 * @return {number} result - <p>Result array containing product of all the element expect the
 * element in the current index </p>
 * Complexity : O(n2)
 */
function getProductsFromArray(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) return;
  console.log(arr);

  const result = [];

  let windowStart = 0;
  let windonwProduct;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    const temp = productOfRemainingElements(arr, windowEnd);
    result.push(temp);
  }
  return result;
}

console.log(getProductsFromArray([2, 4, 6, 8]));

// Approach 2:

// export default getProductsFromArray;

// Q2 merge two sorted array
