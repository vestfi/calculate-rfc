import {
  diacriticMap,
  Diacritic,
  wordsToFilter,
  composedCharactersMap,
} from '../constants'

export { getVerificationCode } from './getVerificationCode'
export { getRfcName } from './getRfcName'
export { getHomonymy } from './getHomonymy'

/**
 * Transforms the birthdate into yymmdd.
 * Adds a leading 0 to month and day and keeps only the last two digits of the year
 * @returns yymmdd date
 */
export const getRfcBirthdate = ({
  year,
  month,
  day,
}: {
  /** year of birth in format yy */
  year: string
  /** month of birth in format mm */
  month: string
  /** day of birth in format dd */
  day: string
}) => {
  const yy = year.slice(-2)
  const mm = addPadding(month)
  const dd = addPadding(day)
  return `${yy}${mm}${dd}`
}

/** Prepends a string number with a 0 when it has a single character */
const addPadding = (stringNumber: string) =>
  stringNumber.length === 1 ? `0${stringNumber}` : stringNumber

/** Replaces diacritic vowels with a regular version */
export const replaceDiacritics = (text: string) =>
  text
    .split('')
    .map((letter) => diacriticMap[letter as Diacritic] ?? letter)
    .join('')

/** Removes words not taken into account when creating the RFC */
export const filterRfcNames = (text: string) => {
  const filteredText = wordsToFilter.reduce(
    (fText, wordToFilter) => fText.replace(wordToFilter, ''),
    text,
  )

  return simplifyComposedCharacters(filteredText)
}

/** Transforms ch into c and ll into l */
export const simplifyComposedCharacters = (text: string) => {
  const simpleText = composedCharactersMap.reduce(
    (sText, composedCharacters) => {
      const firstTwoChars = sText.slice(0, 2)
      if (firstTwoChars !== composedCharacters) {
        return sText
      }

      const firstChar = composedCharacters.charAt(0)
      return sText.replace(composedCharacters, firstChar)
    },
    text,
  )
  return simpleText
}
