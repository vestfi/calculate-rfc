/** Rules and test cases used here can be found in the RFC specifications under section "2.2 Personas Físicas"
 * It can be downloaded from ["Plataforma Nacional de Transparencia"](https://www.infomex.org.mx/gobiernofederal/moduloPublico/moduloPublico.action)
 * with the folio: `0610100135506`
 */
import { describe, it, test, expect } from 'vitest'

import { forbiddenWordsString } from '../lib/constants/rules'
import { forbiddenWordCases } from '../mocks/forbiddenWordCases'
import {
  case1,
  case2,
  simpleCharsCase1,
  simpleCharsCase2,
  shortLastNameCase1,
  shortLastNameCase2,
  composedLastNameCase1,
  composedLastNameCase2,
  composedNameCase1,
  composedNameCase2,
  singleLastNameCase1,
  singleLastNameCase2,
  prepositionCase1,
  prepositionCase2,
  specialCharsCase1,
  specialCharsCase2,
  homoclaveCase,
} from '../mocks/testCases'

import { calculateMexicanRFC } from '../lib/main'
import { LAST_NAME_ERROR, MISSING_DATE_ERROR } from '../lib/constants/errors'

describe('calculateMexicanRFC', () => {
  const rfc1 = calculateMexicanRFC(case1)
  const rfc2 = calculateMexicanRFC(case2)

  it('throws if no last name is included', () => {
    expect(() =>
      calculateMexicanRFC({ ...case1, matronymic: '', patronymic: undefined }),
    ).toThrowError(LAST_NAME_ERROR)
  })

  it('throws if date is missing any parts', () => {
    expect(() =>
      calculateMexicanRFC({ ...case1, day: 0, month: 1, year: 98 }),
    ).toThrowError(MISSING_DATE_ERROR)
    expect(() =>
      calculateMexicanRFC({ ...case1, day: '1', month: '0', year: 98 }),
    ).toThrowError(MISSING_DATE_ERROR)
    expect(() =>
      calculateMexicanRFC({ ...case1, day: '1', month: 1, year: '00000' }),
    ).toThrowError(MISSING_DATE_ERROR)
    expect(() =>
      calculateMexicanRFC({ ...case1, day: '', month: 1, year: 98 }),
    ).toThrowError(MISSING_DATE_ERROR)
    expect(() =>
      calculateMexicanRFC({ ...case1, day: '1', month: '', year: 98 }),
    ).toThrowError(MISSING_DATE_ERROR)
    expect(() =>
      calculateMexicanRFC({ ...case1, day: '1', month: 1, year: '' }),
    ).toThrowError(MISSING_DATE_ERROR)
  })

  it('trims input values correctly', () => {
    const appendEmptySpace = (str: string) => `      ${str}         `
    const rfc = calculateMexicanRFC(
      Object.keys(simpleCharsCase1).reduce((acc, key) => {
        return {
          ...acc,
          [key]: appendEmptySpace(simpleCharsCase1[key]),
        }
      }, {} as typeof simpleCharsCase1),
    )
    expect(rfc).toMatch(/^CAGM240618/)
  })

  /**
   * REGLA 1ª.
   * Se integra la clave con los siguientes datos:
   * 1.	La primera letra del apellido paterno y la siguiente primera vocal del mismo.
   * 2.	La primera letra del apellido materno.
   * 3.	La primera letra del nombre.
   */
  describe('rule 1', () => {
    it('includes the first character and the first vowel of the patronymic', () => {
      expect(rfc1).toMatch(/^BA/)
      expect(rfc2).toMatch(/^II/)
    })

    it('includes the first letter of the matronymic', () => {
      expect(rfc1.charAt(2)).toBe('F')
      expect(rfc2.charAt(2)).toBe('M')
    })

    it('includes the first letter of the name', () => {
      expect(rfc1.charAt(3)).toBe('J')
      expect(rfc2.charAt(3)).toBe('E')
    })
  })

  /**
   * REGLA 2ª.
   * A continuación se anotará la fecha de nacimiento del contribuyente, en el siguiente orden:
   * Año: Se tomarán las dos últimas cifras, escribiéndolas con números arábigos.
   * Mes: Se tomará el mes de nacimiento en su número de orden, en un año de calendario, escribiéndolo con números arábigos.
   * Día: Se escribirá con números arábigos.
   */
  describe('rule 2', () => {
    it('includes the birthdate as yymmdd', () => {
      const date1 = rfc1.slice(4, -3)
      expect(date1).toBe('701213')

      const date2 = rfc2.slice(4, -3)
      expect(date2).toBe('691117')
    })
  })

  /**
   * REGLA 3ª.
   * Cuando la letra inicial de cualquiera de los apellidos o nombre sea compuesta, únicamente se anotará la inicial de ésta. En la Ch la C y en la Ll la L.
   */
  describe('rule 3', () => {
    it('ignores the second character of Ch and Ll', () => {
      const simpleCharsRfc1 = calculateMexicanRFC(simpleCharsCase1)
      const simpleCharsRfc2 = calculateMexicanRFC(simpleCharsCase2)

      expect(simpleCharsRfc1).toMatch(/^CAGM240618/)
      expect(simpleCharsRfc2).toMatch(/^CALF450228/)
    })
  })

  /**
   * REGLA 4ª.
   * En los casos en que el apellido paterno de la persona física se componga de una o dos letras, la clave se formará de la siguiente manera:
   * 1.	La primera letra del apellido paterno.
   * 2.	La primera letra del apellido materno.
   * 3.	La primera y segunda letra del nombre.
   */
  describe('rule 4', () => {
    it('handles patronymics of two or less characters', () => {
      const shortLastNameRfc1 = calculateMexicanRFC(shortLastNameCase1)
      const shortLastNameRfc2 = calculateMexicanRFC(shortLastNameCase2)

      expect(shortLastNameRfc1).toMatch(/^OLAL401201/)
      expect(shortLastNameRfc2).toMatch(/^ERER071120/)
    })
  })

  /**
   * REGLA 5ª.
   * Cuando el apellido paterno o materno sean compuestos, se tomará para la clasificación la primera palabra que corresponda a cualquiera de ellos.
   */
  describe('rule 5', () => {
    it('handles composed last names', () => {
      const composedLastNamesRfc1 = calculateMexicanRFC(composedLastNameCase1)
      const composedLastNamesRfc2 = calculateMexicanRFC(composedLastNameCase2)

      expect(composedLastNamesRfc1).toMatch(/^SADD180812/)
      expect(composedLastNamesRfc2).toMatch(/^SAGM190224/)
    })
  })

  /**
   * REGLA 6ª.
   * Cuando el nombre es compuesto, o sea, que esta formado por dos o más palabras, se tomará para la conformación la letra inicial de la primera, siempre que no sea MARIA o JOSE dado su frecuente uso, en cuyo caso se tomará la primera letra de la segunda palabra.
   */
  describe('rule 6', () => {
    it('handles composed names and ignores Maria and Jose', () => {
      const composedNamesRfc1 = calculateMexicanRFC(composedNameCase1)
      const composedNamesRfc2 = calculateMexicanRFC(composedNameCase2)

      expect(composedNamesRfc1).toMatch(/^FEJL200205/)
      expect(composedNamesRfc2).toMatch(/^CAHA211218/)
    })
  })

  /**
   * REGLA 7ª.
   * En los casos en que la persona física tenga un solo apellido, se conformará con la primera y segunda letras del apellido paterno o materno, según figure en el acta de nacimiento, más la primera y segunda letras del nombre.
   */
  describe('rule 7', () => {
    it('handles single last names', () => {
      const singleLastNameRfc1 = calculateMexicanRFC(singleLastNameCase1)
      const singleLastNameRfc2 = calculateMexicanRFC(singleLastNameCase2)

      expect(singleLastNameRfc1).toMatch(/^MAJU420116/)
      expect(singleLastNameRfc2).toMatch(/^ZAGE251115/)
    })
  })

  /**
   * REGLA 8ª.
   * Cuando en el nombre de las personas físicas figuren artículos, preposiciones, conjunciones o contracciones no se tomarán como elementos de integración de la clave, ejemplos:
   */
  describe('rule 8', () => {
    it('ignores prepositions', () => {
      const prepositionRfc1 = calculateMexicanRFC(prepositionCase1)
      const prepositionRfc2 = calculateMexicanRFC(prepositionCase2)

      expect(prepositionRfc1).toMatch(/^PERC631201/)
      expect(prepositionRfc2).toMatch(/^SACM701110/)
    })
  })

  /**
   * REGLA 9ª.
   * Cuando de las cuatro letras que formen la expresión alfabética, resulte una palabra inconveniente, la ultima letra será sustituida por una  “ X “.
   */
  describe('rule 9', () => {
    test.each(forbiddenWordCases)(
      'given %p %p %p returns %p',
      // eslint-disable-next-line max-params
      (name = '', patronymic = '', matronymic = '') => {
        const firstFourChars = calculateMexicanRFC({
          name,
          patronymic,
          matronymic,
          month: '12',
          day: '1',
          year: '63',
        }).slice(0, 4)
        expect(forbiddenWordsString).not.toMatch(firstFourChars)
      },
    )
  })

  /**
   * REGLA 10ª.
   * Cuando aparezcan formando parte del nombre, apellido paterno y apellido materno los caracteres especiales, éstos deben de excluirse para el cálculo del homónimo y del dígito verificador. Los caracteres se interpretarán, sí y sólo si, están en forma individual dentro del nombre, apellido paterno y apellido materno
   */
  describe('rule 10', () => {
    it('removes special characters', () => {
      const specialCharsRfc1 = calculateMexicanRFC(specialCharsCase1)
      const specialCharsRfc2 = calculateMexicanRFC(specialCharsCase2)

      expect(specialCharsRfc1).toMatch(/^OACR661121/)
      expect(specialCharsRfc2).toMatch(/^DAFR710108/)
    })
  })

  describe('calculates the three characters of the homoclave correctly', () => {
    const homoclave = calculateMexicanRFC(homoclaveCase).slice(-3)

    it('calculates the homonymy correctly (first two characters after the date)', () => {
      expect(homoclave.charAt(0)).toBe('G')
      expect(homoclave.charAt(1)).toBe('R')
    })

    it('calculates the verification code correctly (last character)', () => {
      expect(homoclave.charAt(2)).toBe('8')
    })
  })
})
