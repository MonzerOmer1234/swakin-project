export function mainpulateUserName(name) {
    const newNameArray = name.split(" ");
    let newName = "";
    for (let i = 0; i < newNameArray.length; i++) {
      newName += newNameArray[i].charAt(0) + " ";
      newName = newName.toUpperCase();
    }

    return newName;
  }