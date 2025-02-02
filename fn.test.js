const {
  sumOfArray,
  reverseString,
  isPalindrome,
  purgeDuplicates,
} = require("./fn");

describe("sumOfArray", () => {
  test("sums positive numbers", () => {
    expect(sumOfArray([1, 2, 3])).toBe(6);
  });

  test("handles empty array", () => {
    expect(sumOfArray([])).toBe(0);
  });

  test("ignores non-number elements", () => {
    expect(sumOfArray([1, "a", null, 3])).toBe(4);
  });

  test("throws error for non-array input", () => {
    expect(() => sumOfArray("123")).toThrow("Input must be an array");
  });
});

describe("reverseString", () => {
  test("reverses a basic string", () => {
    expect(reverseString("hello")).toBe("olleh");
  });

  test("handles empty string", () => {
    expect(reverseString("")).toBe("");
  });

  test("throws error for non-string input", () => {
    expect(() => reverseString(123)).toThrow("Input must be a string");
  });
});

describe("isPalindrome", () => {
  test("detects a simple palindrome", () => {
    expect(isPalindrome("racecar")).toBe(true);
  });

  test("ignores case, spaces, and punctuation", () => {
    expect(isPalindrome("No 'x' in Nixon")).toBe(true);
  });

  test("handles non-palindrome", () => {
    expect(isPalindrome("hello")).toBe(false);
  });
});

describe("purgeDuplicates", () => {
  test("removes duplicate numbers", () => {
    expect(purgeDuplicates([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });

  test("handles an array with mixed types", () => {
    expect(purgeDuplicates([1, "a", "a", 2])).toEqual([1, "a", 2]);
  });

  test("throws error for non-array input", () => {
    expect(() => purgeDuplicates("not an array")).toThrow(
      "Input must be an array"
    );
  });
});
