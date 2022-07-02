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
 * Transforms a date (mm/dd/yyyy) into yymmdd
 * @returns yymmdd date
 */
export const getRfcBirthdate = (
  /* date informat mm/dd/yyyy */
  birthdate: string,
) => {
  const [mm, dd, yyyy] = birthdate.split('/')
  const yy = yyyy.slice(-2)
  return `${yy}${mm}${dd}`
}

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
