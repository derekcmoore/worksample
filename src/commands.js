const { printArray, listAllMembers, checkInput } = require("./helpers.js");

let dict = {};

function add(key, value) {
  if (checkInput(key, value)) return;

  if (memberExists(key, value)) {
    console.log(") ERROR, member already exists for key");
    return;
  }

  if (!dict[key]) dict[key] = [];

  dict[key].push(value);
  console.log(") Added");
  return dict;
}

function allMembers() {
  if (!Object.keys(dict).length) {
    console.log(") empty set");
    return;
  }

  printArray(listAllMembers(dict, false));
}

function clear() {
  dict = {};
  console.log(") Cleared");
}

function items() {
  if (!Object.keys(dict).length) {
    console.log(") empty set");
    return;
  }

  printArray(listAllMembers(dict));
}

function keys() {
  if (!Object.keys(dict).length) {
    console.log(") empty set");
    return;
  }

  let temp = Object.keys(dict).map((key, i) => `${key}`);
  printArray(temp);
  return temp;
}

function keyExists(key, enableLogs = false) {
  if (checkInput(key)) return;

  let temp = dict[key] !== undefined;
  if (enableLogs) console.log(`) ${temp}`);
  return temp;
}

function members(key) {
  if (checkInput(key)) return;

  if (!keyExists(key)) {
    console.log(") ERROR, key does not exist");
    return;
  }

  printArray(dict[key]);
  return dict[key];
}

function memberExists(key, value, enableLogs = false) {
  if (checkInput(key, value)) return;
  let temp = keyExists(key) && dict[key].includes(value);
  if (enableLogs) console.log(`) ${temp}`);
  return temp;
}

function remove(key, value) {
  if (checkInput(key, value)) return;

  if (!keyExists(key)) {
    console.log(") ERROR, key does not exist");
    return;
  }

  if (!dict[key].includes(value)) {
    console.log(") ERROR, member does not exist");
    return;
  }

  dict[key] = dict[key].filter((item) => item !== value);

  if (!dict[key].length) {
    delete dict[key];
  }

  console.log(") Removed");
  return dict;
}

function removeAll(key) {
  if (checkInput(key)) return;

  if (!keyExists(key)) {
    console.log(") ERROR, key does not exist");
    return;
  }

  delete dict[key];

  console.log(") Removed");
  return dict;
}

function findAndRunCommand(command, key, value) {
  switch (command) {
    case "ADD":
      add(key, value);
      break;
    case "ALLMEMBERS":
      allMembers();
      break;
    case "CLEAR":
      clear();
      break;
    case "ITEMS":
      items();
      break;
    case "KEYS":
      keys();
      break;
    case "KEYEXISTS":
      keyExists(key, true);
      break;
    case "MEMBERS":
      members(key);
      break;
    case "MEMBEREXISTS":
      memberExists(key, value, true);
      break;
    case "REMOVE":
      remove(key, value);
      break;
    case "REMOVEALL":
      removeAll(key);
      break;
    case "HELP":
      help();
      break;
    default:
      console.log(
        `) Invalid Command. Run HELP to learn more about the program`
      );
  }
}

function help() {
  console.log("ADD");
  console.log(
    "Adds a member to a collection for a given key. Displays an error if the member already exists for the key."
  );

  console.log("ALLMEMBERS");
  console.log(
    "Returns all the members in the dictionary. Returns nothing if there are none. Order is not guaranteed."
  );

  console.log("CLEAR");
  console.log("Removes all keys and all members from the dictionary.");

  console.log("ITEMS");
  console.log(
    "Returns all keys in the dictionary and all of their members. Returns nothing if there are none. Order is not guaranteed."
  );

  console.log("KEYS");
  console.log(
    "Returns all the keys in the dictionary. Order is not guaranteed."
  );

  console.log("KEYEXISTS");
  console.log("Returns whether a key exists or not.");

  console.log("MEMBERS");
  console.log(
    "Returns the collection of strings for the given key. Return order is not guaranteed. Returns an error if the key does not exists."
  );

  console.log("MEMBEREXISTS");
  console.log(
    "Returns whether a member exists within a key. Returns false if the key does not exist."
  );

  console.log("REMOVE");
  console.log(
    "Removes a member from a key. If the last member is removed from the key, the key is removed from the dictionary. If the key or member does not exist, displays an error."
  );

  console.log("REMOVEALL");
  console.log(
    "Removes all members for a key and removes the key from the dictionary. Returns an error if the key does not exist."
  );
}

module.exports = {
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
};
