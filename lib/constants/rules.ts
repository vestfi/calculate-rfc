/** Rules and test cases used here can be found in the RFC specifications under section "2.2 Personas Físicas"
 * It can be downloaded from ["Plataforma Nacional de Transparencia"](https://www.infomex.org.mx/gobiernofederal/moduloPublico/moduloPublico.action)
 * with the folio: `0610100135506`
 */
export const diacriticMap = {
  á: 'a',
  é: 'e',
  í: 'i',
  ó: 'o',
  ú: 'u',
}
export type Diacritic = keyof typeof diacriticMap
export const vowels = 'aeiou'

export const VERIFICATION_CODE_DIVIDING_FACTOR = 11
export const VERIFICATION_CODE_STARTING_INDEX = 13

export const wordsToFilter = [
  '.',
  ',',
  'de ',
  'del ',
  'la ',
  'los ',
  'las ',
  'y ',
  'mc ',
  'mac ',
  'von ',
  'van ',
  'jose ',
  'maria ',
  'j ',
  'ma ',
] as const

export const composedCharactersMap = ['ch', 'll'] as const

export const forbiddenWordsString = `
  BUEI BUEY CACA CACO CAGA CAGO CAKA
  KOGE KOJO KAKA KULO MAME MAMO MEAR
  MEAS MEON MION COJE COJI COJO CULO
  FETO GUEY JOTO KACA KACO KAGA KAGO
  MOCO MULA PEDA PEDO PENE PUTA PUTO
  QULO RATA RUIN CAKO COGE COJA`

export const charToNumberTable = {
  '&': '10',
  ' ': '00',
  '0': '00',
  '1': '01',
  '2': '02',
  '3': '03',
  '4': '04',
  '5': '05',
  '6': '06',
  '7': '07',
  '8': '08',
  '9': '09',
  A: '11',
  B: '12',
  C: '13',
  D: '14',
  E: '15',
  F: '16',
  G: '17',
  H: '18',
  I: '19',
  J: '21',
  K: '22',
  L: '23',
  M: '24',
  N: '25',
  O: '26',
  P: '27',
  Q: '28',
  R: '29',
  S: '32',
  T: '33',
  U: '34',
  V: '35',
  W: '36',
  X: '37',
  Y: '38',
  Z: '39',
  Ñ: '40',
}
export type RfcChars = keyof typeof charToNumberTable

export const HOMONYMY_DIVISION_FACTOR = 34
export const homonymChart = {
  '0': '1',
  '1': '2',
  '10': 'B',
  '11': 'C',
  '12': 'D',
  '13': 'E',
  '14': 'F',
  '15': 'G',
  '16': 'H',
  '17': 'I',
  '18': 'J',
  '19': 'K',
  '2': '3',
  '20': 'L',
  '21': 'M',
  '22': 'N',
  '23': 'P',
  '24': 'Q',
  '25': 'R',
  '26': 'S',
  '27': 'T',
  '28': 'U',
  '29': 'V',
  '3': '4',
  '30': 'W',
  '31': 'X',
  '32': 'Y',
  '33': 'Z',
  '4': '5',
  '5': '6',
  '6': '7',
  '7': '8',
  '8': '9',
  '9': 'A',
}
export type HomonymKey = keyof typeof homonymChart

export const verificationNumberChart = {
  '0': '00',
  '1': '01',
  '2': '02',
  '3': '03',
  '4': '04',
  '5': '05',
  '6': '06',
  '7': '07',
  '8': '08',
  '9': '09',
  A: '10',
  B: '11',
  C: '12',
  D: '13',
  E: '14',
  F: '15',
  G: '16',
  H: '17',
  I: '18',
  J: '19',
  K: '20',
  L: '21',
  M: '22',
  N: '23',
  '&': '24',
  O: '25',
  P: '26',
  Q: '27',
  R: '28',
  S: '29',
  T: '30',
  U: '31',
  V: '32',
  W: '33',
  X: '34',
  Y: '35',
  Z: '36',
  ' ': '37',
  Ñ: '38',
}
export type VerificationNumberKey = keyof typeof verificationNumberChart
