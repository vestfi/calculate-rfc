import {
  VERIFICATION_CODE_DIVIDING_FACTOR,
  VerificationNumberKey,
  verificationNumberChart,
  VERIFICATION_CODE_STARTING_INDEX,
} from '../constants/rules'

/** Calculates the "homoclave" verification code based on the RFC without the last digit (name + date + homonymy) */
export const getVerificationCode = (
  /** RFC without the last digit */
  rfc: string,
): string => {
  const toSum: string[] = []

  for (let i = 0; i <= rfc.length; i++) {
    const currentChar = rfc.charAt(i)
    const charValue =
      verificationNumberChart[currentChar as VerificationNumberKey] || '00'
    toSum.push(charValue)
  }

  let verificationNumberSum = 0
  let y = 0

  for (let i = VERIFICATION_CODE_STARTING_INDEX; i > 1; i--) {
    verificationNumberSum = verificationNumberSum + parseInt(toSum[y]) * i
    y++
  }

  const verificationNumber =
    verificationNumberSum % VERIFICATION_CODE_DIVIDING_FACTOR

  if (verificationNumber === 0) {
    return verificationNumber.toString()
  }

  if (verificationNumber === 10) {
    return 'A'
  }

  if (verificationNumber <= 10) {
    return returnVerificationNumber(
      VERIFICATION_CODE_DIVIDING_FACTOR - verificationNumber,
    ).toString()
  }

  return verificationNumber.toString()
}

/** If verification number is 10 we should return 'A' */
const returnVerificationNumber = (verificationNumber: number) =>
  verificationNumber === 10 ? 'A' : verificationNumber
