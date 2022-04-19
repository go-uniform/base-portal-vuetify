export const prepend = (array: any, values: any) => {
  const newArray = array.slice();
  values.reverse().forEach((value: any) => {
    newArray.unshift(value);
  });
  return newArray;
}

