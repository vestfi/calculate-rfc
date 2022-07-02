import {
  filterRfcNames,
  getRfcBirthdate,
  getVerificationCode,
  replaceDiacritics,
  getHomonymy,
  getRfcName,
} from "./helpers";

/** Calculates the RFC of a "Persona Física" based on [these specs](https://docs.google.com/document/d/18wrQvI1WB41jp97Zme1qdePHI4TlqJh5bj9nZkJ3Lz0/edit) defined by the SAT.*/
export const calculateMexicanRFC = ({
  birthdate,
  name,
  patronymic,
  matronymic,
}: {
  /** birthdate in format mm/dd/yyyy */
  birthdate: string;
  /** name (including second name) */
  name: string;
  /** name derived from the father */
  patronymic: string;
  /** name derived from the mother */
  matronymic: string;
}) => {
  const rfcBirthdate = getRfcBirthdate(birthdate);

  const cleanName = replaceDiacritics(name).toLowerCase();
  const cleanPatronymic = replaceDiacritics(patronymic).toLowerCase();
  const cleanMatronymic = replaceDiacritics(matronymic).toLowerCase();

  const filteredName = filterRfcNames(cleanName);
  const filteredPatronymic = filterRfcNames(cleanPatronymic);
  const filteredMatronymic = filterRfcNames(cleanMatronymic);

  const rfcName = getRfcName(
    filteredName,
    filteredPatronymic,
    filteredMatronymic
  );

  const homonymy = getHomonymy(cleanName, cleanPatronymic, cleanMatronymic);

  const rfcWithoutVerificationCode =
    `${rfcName}${rfcBirthdate}${homonymy}`.toUpperCase();

  const verificationCode = getVerificationCode(rfcWithoutVerificationCode);

  const rfc = `${rfcWithoutVerificationCode}${verificationCode}`;

  return rfc;
};
