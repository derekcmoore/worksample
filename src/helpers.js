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

module.exports = { printArray, listAllMembers };
