const { printArray, listAllMembers } = require("../src/helpers");

describe("function printArray", () => {
  test("with an null input", () => {
    console.log = jest.fn();

    printArray(null);

    expect(console.log).not.toHaveBeenCalled();
  });

  test("with an empty array", () => {
    console.log = jest.fn();

    input = [];
    printArray(input);

    expect(console.log).not.toHaveBeenCalled();
  });

  test("with an array of values", () => {
    console.log = jest.fn();

    input = ["test one", "test two"];
    printArray(input);

    expect(console.log.mock.calls.length).toBe(2);
    expect(console.log.mock.calls[0][0]).toBe(`1) ${input[0]}`);
    expect(console.log.mock.calls[1][0]).toBe(`2) ${input[1]}`);
  });
});

describe("function listAllMembers", () => {
  test("with an null input", () => {
    result = listAllMembers(null);

    expect(result).toBe(undefined);
  });

  test("with an empty hash input", () => {
    result = listAllMembers({});

    expect(result.length).toBe(0);
  });

  test("with an hash input whose values are strings", () => {
    result = listAllMembers({ key: "test" });

    expect(result.length).toBe(1);
  });

  test("with an hash input whose values are arrays", () => {
    result = listAllMembers({ key: ["test one", "test two"] });

    expect(result.length).toBe(2);
  });

  test("with showKey = true", () => {
    key = "key";
    input = { key: ["test one", "test two"] };
    result = listAllMembers(input);

    expect(result[0]).toBe(`${key}: ${input[key][0]}`);
  });

  test("with showKey = false", () => {
    key = "key";
    input = { key: ["test one", "test two"] };
    result = listAllMembers(input, false);

    expect(result[0]).toBe(`${input[key][0]}`);
  });
});
