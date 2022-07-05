import { MISSING_DATE_ERROR } from '../constants/errors'

export interface GetRfcBirthDate {
  /** year of birth in format yy */
  year: string | number
  /** month of birth in format mm */
  month: string | number
  /** day of birth in format dd */
  day: string | number
}

/**
 * Transforms the birthdate into yymmdd.
 * Adds a leading 0 to month and day and keeps only the last two digits of the year
 * @returns yymmdd date
 */
export const getRfcBirthdate = ({ year, month, day }: GetRfcBirthDate) => {
  validateDate({ year, month, day })

  const yy = `${year}`.slice(-2)
  const mm = addPadding(`${month}`)
  const dd = addPadding(`${day}`)
  return `${yy}${mm}${dd}`
}

/**
 * Checks that year, month and day exist and don't equal 0
 * otherwise, throws an error
 */
export const validateDate = ({ year, month, day }: GetRfcBirthDate) => {
  const isInvalid = [year, month, day].some(
    (part) => !(typeof part === 'string' ? parseInt(part) : part),
  )

  if (isInvalid) {
    throw Error(MISSING_DATE_ERROR)
  }
}

/** Prepends a string number with a 0 when it has a single character */
export const addPadding = (stringNumber: string) =>
  stringNumber.length === 1 ? `0${stringNumber}` : stringNumber
