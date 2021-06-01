const fs = require('fs');

function loadTestCase() {
  const testCaseArr = [];
  for (let i = 0; i < 12; i++) {
    const fileName = i < 10 ? `input00${i}.txt` : `input0${i}.txt`;
    const testCaseI = fs
      .readFileSync(`./BalancingArray/ArrayTestCases/${fileName}`)
      .toString('utf-8');
    const tcArrayI = testCaseI
      .split(/\r\n|\n/)
      .map((el) => +el)
      .filter((_, index) => index !== 0);
    testCaseArr.push(tcArrayI);
  }
  return testCaseArr;
}

function sumArr(arr, from, to) {
  let sumArr = 0;
  for (let index = from; index <= to; index++) {
    sumArr += arr[index];
  }
  return sumArr;
}

/**
 *Given an array of numbers, find the index of the smallest array element (the pivot), 
 for which the sums of all elements to the left and to the right are equal. 
 The array may not be reordered.
 * @param {Array<number>} rawArray n 's the length with 3 ≤ n ≤ 105
 * @returns {number} an integer representing the index of the pivot
 */
function balancedSum(rawArray) {
  let balancedArr = [];
  const {length} = rawArray;

  for (let index = 1; index < length - 1; index++) {
    const leftSum = sumArr(rawArray, 0, index - 1);
    const rightSum = sumArr(rawArray, index + 1, length - 1);

    if (leftSum === rightSum) {
      // push the index and value to array
      balancedArr.push({value: rawArray[index], index});
    }
  }
  if (!balancedArr.length) {
    // cant find the index, return -1
    return -1;
  } else if (balancedArr.length === 1) {
    return balancedArr[0].index;
  } else {
    const sortedBlancedArr = balancedArr.sort(function (prev, next) {
      return prev.value - next.value;
    });
    return sortedBlancedArr[0].index;
  }
}

// console.log(balancedSum(tcArray1));
console.log('Loading the testcase...');
const testCaseArr = loadTestCase();
console.log(
  'Loading the testcase successfully, starting calculate the index...'
);
for (let i = 0; i < testCaseArr.length; i++) {
  console.log(
    `The balanced index of testcase ${i} is: ${balancedSum(testCaseArr[i])}`
  );
}
