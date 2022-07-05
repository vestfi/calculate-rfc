import {
  diacriticMap,
  Diacritic,
  wordsToFilter,
  composedCharactersMap,
} from '../constants/rules'

export { getVerificationCode } from './getVerificationCode'
export { getRfcName } from './getRfcName'
export { getHomonymy } from './getHomonymy'
export { getRfcBirthdate } from './getRfcBirthdate'

/** Replaces diacritic vowels with a regular version */
export const replaceDiacritics = (text = '') =>
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
