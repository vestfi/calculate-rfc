import { LAST_NAME_ERROR } from './constants/errors'
import {
  filterRfcNames,
  getVerificationCode,
  replaceDiacritics,
  getHomonymy,
  getRfcName,
} from './helpers'

import { getRfcBirthdate, GetRfcBirthDate } from './helpers/getRfcBirthdate'

type CalculateMexicanRFC = GetRfcBirthDate & {
  /** Name (including second name) */
  name: string
  /** Name derived from the father */
  patronymic?: string
  /** Name derived from the mother */
  matronymic?: string
}

/** Calculates the RFC of a "Persona Física" based on [these specs](https://docs.google.com/document/d/18wrQvI1WB41jp97Zme1qdePHI4TlqJh5bj9nZkJ3Lz0/edit) defined by the SAT.*/
export function calculateMexicanRFC(
  input: CalculateMexicanRFC & { matronymic: string; patronymic?: void },
): string
export function calculateMexicanRFC(
  input: CalculateMexicanRFC & { patronymic: string; matronymic?: void },
): string
export function calculateMexicanRFC(
  input: CalculateMexicanRFC & { matronymic: string; patronymic: string },
): string
export function calculateMexicanRFC({
  name,
  patronymic,
  matronymic,
  year,
  month,
  day,
}: CalculateMexicanRFC) {
  if (!patronymic?.trim() && !matronymic?.trim()) {
    throw Error(LAST_NAME_ERROR)
  }

  const cleanName = replaceDiacritics(name).toLowerCase()
  const cleanPatronymic = replaceDiacritics(patronymic).toLowerCase()
  const cleanMatronymic = replaceDiacritics(matronymic).toLowerCase()

  const filteredName = filterRfcNames(cleanName)
  const filteredPatronymic = filterRfcNames(cleanPatronymic)
  const filteredMatronymic = filterRfcNames(cleanMatronymic)

  const rfcName = getRfcName(
    filteredName,
    filteredPatronymic,
    filteredMatronymic,
  )

  const rfcBirthdate = getRfcBirthdate({ year, month, day })

  const homonymy = getHomonymy(cleanName, cleanPatronymic, cleanMatronymic)

  const rfcWithoutVerificationCode =
    `${rfcName}${rfcBirthdate}${homonymy}`.toUpperCase()

  const verificationCode = getVerificationCode(rfcWithoutVerificationCode)

  const rfc = `${rfcWithoutVerificationCode}${verificationCode}`

  return rfc
}
