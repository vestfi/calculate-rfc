import { describe, it, expect, test } from "vitest";

import { forbiddenWordCases } from "../mocks/forbiddenWordCases";

import { calculateMexicanRFC } from "../lib/main";

import {
  filterRfcNames,
  getHomonymy,
  getRfcBirthdate,
  getRfcName,
  getVerificationCode,
  replaceDiacritics,
  simplifyComposedCharacters,
} from "../lib/helpers";

const fakeBirthdate = "10/09/1964";
const [month, day, yyyy] = fakeBirthdate.split("/");
const [, , decade, yearDigit] = yyyy.split("");
const year = `${decade}${yearDigit}`;
const fakeName = "Guillermo";
const fakePatronymic = "Del Toro";
const fakeMatronymic = "Gómez";

const expectedRFCBirthdate = "641009";
const expectedRFC = `TOGG${expectedRFCBirthdate}MGA`;

describe("calculateMexicanRFC", () => {
  it("calculates a valid RFC", () => {
    const rfc1 = calculateMexicanRFC({
      month,
      day,
      year,
      name: fakeName,
      patronymic: fakePatronymic,
      matronymic: fakeMatronymic,
    });

    expect(rfc1).toBe(expectedRFC);
  });

  it.todo("respects all rules set by SAT");
});

describe("helpers", () => {
  describe("getRfcBirthdate", () => {
    it("should transform the KYC birthdate to the RFC format", () => {
      const rfcBirthdate = getRfcBirthdate({ month, day, year });
      expect(rfcBirthdate).toBe(expectedRFCBirthdate);
    });

    it("should sanitize the input format", () => {
      const rfcBirthdate = getRfcBirthdate({
        month: "6",
        day: "5",
        year: "89",
      });
      expect(rfcBirthdate).toBe("890605");
    });
  });

  describe("replaceDiacritics", () => {
    it("should replace accented characters with their regular counterpart", () => {
      const result = replaceDiacritics(fakeMatronymic);
      expect(result).toBe("Gomez");
    });
  });

  describe("filterUnnecessaryWords", () => {
    it("should remove unnecessary words from a string", () => {
      const filteredName = filterRfcNames("jose maria");
      const filteredPatronymic = filterRfcNames("de la concepcion");
      const filteredMatronymic = filterRfcNames("von perez");

      expect(filteredName).toBe("maria");
      expect(filteredPatronymic).toBe("concepcion");
      expect(filteredMatronymic).toBe("perez");
    });
  });

  describe("simplifyComposedCharacters", () => {
    it("should remove unnecessary words from a string", () => {
      const result1 = simplifyComposedCharacters("chal");
      expect(result1).toBe("cal");
      const result2 = simplifyComposedCharacters("llano");
      expect(result2).toBe("lano");
    });
  });

  describe("getRfcName", () => {
    it("should get the name portion for a short patronymic", () => {
      const result = getRfcName("edgar oscar", "sa", "palacio");
      expect(result).toBe("sped");
    });

    it("should get the name portion for a regular patronymic", () => {
      const result1 = getRfcName("guilltermo", "toro", "gomez");
      expect(result1).toBe("togg");

      const result2 = getRfcName("edgar", "ovidio", "sandoval");
      expect(result2).toBe("oise");
    });

    it("should get the name portion for a single last name (matronymic)", () => {
      const result1 = getRfcName("guillermo", undefined, "gomez");
      expect(result1).toBe("gogu");
    });

    it("should get the name portion for a single last name (patronymic)", () => {
      const result1 = getRfcName("guillermo", "toro");
      expect(result1).toBe("togu");
    });

    test.each(forbiddenWordCases)(
      "given %p %p %p returns %p",
      // eslint-disable-next-line max-params
      (name = "", patronymic, matronymic, expected) => {
        expect(getRfcName(name, patronymic, matronymic)).toBe(expected);
      }
    );
  });

  describe("getHomonymy", () => {
    it("returns the correct homonymy for a given name", () => {
      expect(getHomonymy("guillermo", "del toro", "gomez")).toBe("MG");
    });
  });

  describe("getVerificationCode", () => {
    it("returns the correct verification code for a given RFC", () => {
      expect(getVerificationCode("TOGG641009MG")).toBe("A");
    });
  });
});
