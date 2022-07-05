import {
  filterRfcNames,
  getRfcBirthdate,
  getVerificationCode,
  replaceDiacritics,
  getHomonymy,
  getRfcName,
} from './helpers'

type CalculateMexicanRFC = {
  /** Name (including second name) */
  name: string
  /** Name derived from the father */
  patronymic?: string
  /** Name derived from the mother */
  matronymic?: string
} & Parameters<typeof getRfcBirthdate>[0]

/** Calculates the RFC of a "Persona Física" based on [these specs](https://docs.google.com/document/d/18wrQvI1WB41jp97Zme1qdePHI4TlqJh5bj9nZkJ3Lz0/edit) defined by the SAT.*/
// export function calculateMexicanRFC(
//   input: Omit<CalculateMexicanRFC, 'patronymic'>,
// ): string
// export function calculateMexicanRFC(
//   input: Omit<CalculateMexicanRFC, 'matronymic'>,
// ): string
export function calculateMexicanRFC({
  name,
  patronymic,
  matronymic,
  year,
  month,
  day,
}: CalculateMexicanRFC) {
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
