import {
  charToNumberTable,
  RfcChars,
  HOMONYMY_DIVISION_FACTOR,
  homonymChart,
  HomonymKey,
} from "../constants";

/** Generates the first two characters of the "homoclave" */
export const getHomonymy = (
  name: string,
  patronymic: string,
  matronymic: string
) => {
  const fullName = `${patronymic.trim()} ${matronymic.trim()} ${name.trim()}`
    .trim()
    .toUpperCase();

  const fullNameInRfcNumbers = convertFullNameToRfcNumbers(fullName);
  const homonymy = calculateHomonymy(fullNameInRfcNumbers);

  return homonymy;
};

/** Transforms the full name into the corresponding values defined by SAT */
const convertFullNameToRfcNumbers = (
  fullName: string,
  currentFullName = "0",
  currentIndex = 0
): string => {
  const currentChar = fullName[currentIndex];
  const charNumber = charToNumberTable[currentChar as RfcChars];

  const fullNameAsRfcNumbers = `${currentFullName}${charNumber}`;
  const nextIndex = currentIndex + 1;

  if (!fullName[nextIndex]) {
    return fullNameAsRfcNumbers;
  }

  return convertFullNameToRfcNumbers(fullName, fullNameAsRfcNumbers, nextIndex);
};

/** Calculates the first two characters of the homonym based on the name converted into the numeric values */
const calculateHomonymy = (
  /** full name converted to values defined by SAT */
  fullNameInRfcNumbers: string
) => {
  const nameSumTotal = calculateNameParts(fullNameInRfcNumbers);
  const totalRemainder = nameSumTotal % 1000;
  const remainderDividedByFactor = totalRemainder / HOMONYMY_DIVISION_FACTOR;

  const [firstNumber] = remainderDividedByFactor.toString().split(".");
  const secondNumber = (totalRemainder % HOMONYMY_DIVISION_FACTOR).toString();

  const firstHomonym = homonymChart[firstNumber as HomonymKey];
  const secondHomonym = homonymChart[secondNumber as HomonymKey];

  return `${firstHomonym}${secondHomonym}`;
};

/** Recursive function that calculates the total of the name as numbers */
const calculateNameParts = (
  fullNameInRfcNumbers: string,
  currentIndex = 0,
  currentTotal = 0
): number => {
  const nextIndex = currentIndex + 1;

  const firstNumberStr = getNCharsAtIndex(
    fullNameInRfcNumbers,
    currentIndex,
    2
  );
  const secondNumberStr = getNCharsAtIndex(fullNameInRfcNumbers, nextIndex);
  const secondNumber = parseInt(secondNumberStr);

  if (Number.isNaN(secondNumber)) {
    return currentTotal;
  }

  const newTotal = currentTotal + parseInt(firstNumberStr) * secondNumber;

  return calculateNameParts(fullNameInRfcNumbers, nextIndex, newTotal);
};

/** Returns n characters from a string starting from an index */
const getNCharsAtIndex = (text: string, index: number, charsToTake = 1) =>
  text.slice(index, index + charsToTake);
