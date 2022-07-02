import { forbiddenWordsString, vowels } from '../constants'

/** Generates the RFC's first four characters based on full name */
export const getRfcName = (name: string, patronymic = '', matronymic = '') => {
  const noLastNames = !patronymic.length && !matronymic.length

  if (noLastNames) {
    throw Error('NEEDS_ONE_LAST_NAME')
  }

  const hasBothLastNames = matronymic.length && patronymic.length
  const hasShortPatronymic = hasBothLastNames && patronymic.length < 3

  if (hasShortPatronymic) {
    return getShortLastNameRfcName(name, patronymic, matronymic)
  }

  if (hasBothLastNames) {
    return getRegularRfcName(name, patronymic, matronymic)
  }

  return getSingleLastNameRfcName(name, matronymic || patronymic)
}

/** Returns the RFC name for short patronymics */
const getShortLastNameRfcName = (
  name: string,
  patronymic: string,
  matronymic: string,
) => {
  const firstTwoNameCharacters = name.slice(0, 2)
  const firstPatronymicCharacter = patronymic.charAt(0)
  const firstMatronymicCharacter = matronymic.charAt(0)

  return censorForbiddenWord(
    `${firstPatronymicCharacter}${firstMatronymicCharacter}${firstTwoNameCharacters}`,
  )
}

/** Returns the RFC name for regular length names */
const getRegularRfcName = (
  name: string,
  patronymic: string,
  matronymic: string,
) => {
  let firstPatronymicVowelAfterFirstCharacter = ''

  for (let i = 1; i <= patronymic.length; i++) {
    if (!firstPatronymicVowelAfterFirstCharacter) {
      for (let x = 0; x <= vowels.length; x++) {
        if (patronymic.charAt(i) === vowels.charAt(x)) {
          firstPatronymicVowelAfterFirstCharacter = patronymic.charAt(i)
        }
      }
    }
  }

  const firstPatronymicCharacter = patronymic.charAt(0)
  const firstMatronymicCharacter = matronymic.charAt(0)
  const firstNameCharacter = name.charAt(0)

  return censorForbiddenWord(
    `${firstPatronymicCharacter}${firstPatronymicVowelAfterFirstCharacter}${firstMatronymicCharacter}${firstNameCharacter}`,
  )
}

/** Returns the RFC name for names with a single last name */
const getSingleLastNameRfcName = (name: string, lastName: string) =>
  censorForbiddenWord(`${lastName.slice(0, 2)}${name.slice(0, 2)}`)

/** Replaces the last character of forbidden words with an X */
const censorForbiddenWord = (text: string) => {
  const isForbidden = forbiddenWordsString.includes(text.toUpperCase())

  return isForbidden ? text.replace(/.$/, 'x') : text
}
