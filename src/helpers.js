function printArray(array) {
  if (array) array.forEach((value, i) => console.log(`${i + 1}) ${value}`));
}

function listAllMembers(dict, showKey = true) {
  if (!dict) return;
  let temp = [];
  Object.keys(dict).forEach((key, i) => {
    let string = "";
    if (showKey) string += `${key}: `;

    if (dict[key].constructor === Array) {
      dict[key].forEach((value, i) => {
        temp.push(string + value);
      });

      return;
    }

    temp.push(string + dict[key]);
  });

  return temp;
}

function checkInput(key, value) {
  if (!key) console.log(`) Invalid Key ${key}`);

  if (typeof value === "undefined") return !key;

  if (!value) {
    console.log(`) Invalid Member ${value}`);
    return true;
  }

  return false;
}

module.exports = { printArray, listAllMembers, checkInput };
