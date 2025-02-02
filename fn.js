// 1. Sum of Array
function sumOfArray(arr) {
  if (!Array.isArray(arr)) throw new Error("Input must be an array");
  return arr.reduce((sum, num) => sum + (typeof num === "number" ? num : 0), 0);
}

// 2. Reverse String
function reverseString(str) {
  if (typeof str !== "string") throw new Error("Input must be a string");
  return str.split("").reverse().join("");
}

// 3. Is Palindrome
function isPalindrome(str) {
  if (typeof str !== "string") throw new Error("Input must be a string");
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleanStr === cleanStr.split("").reverse().join("");
}

// 4. Purge Duplicates
function purgeDuplicates(arr) {
  if (!Array.isArray(arr)) throw new Error("Input must be an array");
  return [...new Set(arr)];
}

module.exports = { sumOfArray, reverseString, isPalindrome, purgeDuplicates };
