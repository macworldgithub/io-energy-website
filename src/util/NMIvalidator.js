function NMIvalidation(NMI) {
  NMI = NMI.replace(/\s/g, "");

  //Check if length is 10 or 11. If 10 return True, else execute checksum
  if (NMI.length === 10) {
    return true;
  } else if (NMI.length === 11) {
    return checkSumValidation(NMI);
  }

  return false;
}

function checkSumValidation(NMI) {
  const lastDigit = NMI.charAt(NMI.length - 1);
  const NMI_reversed = NMI.slice(0, -1).split("").reverse();

  let ASCII_values = [];
  let double_ASCII = [];

  for (let index = 0; index < NMI_reversed.length; index++) {
    const element = NMI_reversed[index];
    ASCII_values.push(element.charCodeAt(0));
  }

  for (let index = 0; index < ASCII_values.length; index++) {
    const element = ASCII_values[index];
    if (index % 2 === 0) {
      double_ASCII.push(element * 2);
    } else {
      double_ASCII.push(element);
    }
  }

  const sum_digit = [];
  for (let index = 0; index < double_ASCII.length; index++) {
    let sum = 0;
    const element = double_ASCII[index].toString();
    for (let index = 0; index < element.length; index++) {
      const e = element[index];
      sum += parseInt(e);
    }
    sum_digit.push(sum);
  }

  const list_sum = sum_digit.reduce((partialSum, a) => partialSum + a, 0);

  let check_sum = Math.ceil(list_sum / 10) * 10 - list_sum;

  if (check_sum < 0) {
    check_sum = check_sum + 10;
  }

  if (check_sum === Number(lastDigit)) {
    return true;
  }
  return false;
}

export default NMIvalidation;
