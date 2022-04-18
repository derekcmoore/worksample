let {
  add,
  allMembers,
  clear,
  items,
  keys,
  keyExists,
  members,
  memberExists,
  remove,
  removeAll,
  findAndRunCommand,
} = require("../src/commands");

beforeEach(() => {
  console.log = jest.fn();
});

afterEach(() => {
  clear();
});

const key = "test";
const value = "testValue";

describe("function add", () => {
  test("with a key and value", () => {
    result = add(key, value);

    expected = {};
    expected[key] = [value];
    expect(result).toMatchObject(expected);
    expect(console.log.mock.calls[0][0]).toBe(") Added");
  });

  test("with a key and value that already exists", () => {
    add(key, value);
    add(key, value);

    // the first add outputs to console, so the value is one greater
    expect(console.log.mock.calls.length).toBe(2);
    expect(console.log.mock.calls[1][0]).toBe(
      ") ERROR, member already exists for key"
    );
  });
});

describe("function allMembers", () => {
  test("with an empty dict", () => {
    allMembers();
    expect(console.log.mock.calls[0][0]).toBe(") empty set");
  });

  test("with a dict containing keys", () => {
    add(key, value);
    allMembers();

    // add outputs to console, so the value is one greater
    expect(console.log.mock.calls.length).toBe(2);
  });
});

describe("function clear", () => {
  test("with any dict", () => {
    clear();
    expect(console.log.mock.calls[0][0]).toBe(") Cleared");
  });
});

describe("function items", () => {
  test("with an empty dict", () => {
    items();
    expect(console.log.mock.calls[0][0]).toBe(") empty set");
  });

  test("with a dict containing keys", () => {
    add(key, value);
    items();

    // add outputs to console, so the value is one greater
    expect(console.log.mock.calls.length).toBe(2);
  });
});

describe("function keys", () => {
  test("with an empty dict", () => {
    keys();
    expect(console.log.mock.calls[0][0]).toBe(") empty set");
  });

  test("with a dict containing keys", () => {
    add(key, value);
    result = keys();

    // add outputs to console, so the value is one greater
    expect(result).toContain(key);
    expect(console.log.mock.calls.length).toBe(2);
  });
});

describe("function keyExists", () => {
  test("with a key that doesnt exist", () => {
    result = keyExists(key);
    expect(result).toBe(false);
  });

  test("with a key that does exist", () => {
    add(key, value);
    result = keyExists(key);
    expect(result).toBe(true);
  });

  test("with enableLogs = true", () => {
    result = keyExists(key, true);
    expect(console.log.mock.calls.length).toBe(1);
  });
});

describe("function members", () => {
  test("with an empty dict", () => {
    members(key);
    expect(console.log.mock.calls[0][0]).toBe(") ERROR, key does not exist");
  });

  test("with a dict containing keys and a correct key", () => {
    add(key, value);
    result = members(key);

    // add outputs to console, so the value is one greater
    expect(result).toContain(value);
    expect(console.log.mock.calls.length).toBe(2);
  });

  test("with a dict containing keys and an incorrect key", () => {
    add(key, value);
    result = members("badkey");

    expect(console.log.mock.calls[1][0]).toBe(") ERROR, key does not exist");
  });
});

describe("function memberExists", () => {
  test("with a key that doesnt exist", () => {
    result = memberExists(key, value);
    expect(result).toBe(false);
  });

  test("with a key and value that does exist", () => {
    add(key, value);
    result = memberExists(key, value);
    expect(result).toBe(true);
  });

  test("with a key that does exist and value that doesnt exist", () => {
    add(key, value);
    result = memberExists(key, "badvalue");
    expect(result).toBe(false);
  });

  test("with enableLogs = true", () => {
    result = memberExists(key, value, true);
    expect(console.log.mock.calls.length).toBe(1);
  });
});

describe("function remove", () => {
  test("with a key that doesnt exist", () => {
    result = remove(key, value);
    expect(console.log.mock.calls[0][0]).toBe(") ERROR, key does not exist");
  });

  test("with a key that does exist and value that doesnt exist", () => {
    add(key, value);
    result = remove(key, "badvalue");
    expect(console.log.mock.calls[1][0]).toBe(") ERROR, member does not exist");
  });

  test("with a key and value that does exist", () => {
    removeValue = "removeValue";
    add(key, value);
    add(key, removeValue);

    result = remove(key, removeValue);

    expected = {};
    expected[key] = [value];
    expect(result).toMatchObject(expected);
    expect(console.log.mock.calls[2][0]).toBe(") Removed");
  });

  test("with a key and value that does exist and only one item in the key", () => {
    add(key, value);

    result = remove(key, value);

    expect(result).toMatchObject({});
    expect(console.log.mock.calls[1][0]).toBe(") Removed");
  });
});

describe("function removeAll", () => {
  test("with a key that doesnt exist", () => {
    result = removeAll(key);
    expect(console.log.mock.calls[0][0]).toBe(") ERROR, key does not exist");
  });

  test("with a key that does exist", () => {
    add(key, value);

    result = removeAll(key);

    expect(result).toMatchObject({});
    expect(console.log.mock.calls[1][0]).toBe(") Removed");
  });
});
