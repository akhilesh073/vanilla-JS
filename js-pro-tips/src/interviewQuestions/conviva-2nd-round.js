const arr1 = [
  { id: 1, name: "Bangalore" },
  { id: 4, name: "Mysore" },
  { id: 8, name: "Mangalore" },
];
const arr2 = [
  { id: 5, name: "Tumkur" },
  { id: 2, name: "Hubbali" },
  { id: 7, name: "Hampi" },
];

function mergeArrays(arr1, arr2) {
  //	let result = [...arr1, ...arr2];

  //  result.sort((a,b) => a.id - b.id);
  //return result;

  const l1 = arr1.length;
  const l2 = arr2.length;

  let result = new Array(l1 + l2).fill(0);
  let i = 0;
  let j = 0;
  let k = 0;

  arr1.sort((a, b) => a.id - b.id);
  arr2.sort((a, b) => a.id - b.id);

  while (i < l1 && j < l2) {
    if (arr1[i].id < arr2[j].id) {
      result[k++] = arr1[i++];
    } else {
      result[k++] = arr2[j++];
    }
  }

  while (i < l1) {
    result[k++] = arr1[i++];
  }

  while (j < l2) {
    result[k++] = arr2[j++];
  }

  return result;
}

console.log(mergeArrays(arr1, arr2));
