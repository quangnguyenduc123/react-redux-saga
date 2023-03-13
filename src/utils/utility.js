import * as aesjs from 'aes-js';

/**
 * Update Object with deep copy object
 * @param oldObject
 * @param updatedProperties
 * @return {{}}
 */
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

/**
 * Check Validate form
 * @param value
 * @param rules
 * @return {boolean}
 */
export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    // eslint-disable-next-line
    const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const result = value.match(pattern);
    isValid = result && result.length === 1 && result[0] === value && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.hasUpperCase) {
    // eslint-disable-next-line
    const pattern = /[A-Z]/;
    isValid = pattern.test(value) && isValid;
  }


  if (rules.isPassword) {
    // eslint-disable-next-line
    const pattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[#@£$-\/:-?{-~!"^_`\[\]a-zA-Z0-9]/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.hasSpecialCharacter) {
    // eslint-disable-next-line
    const pattern = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

/**
 * Set Cookie
 * @param name
 * @param value
 * @param days
 * @param path
 */
export const setCookie = (value ) => {
  localStorage.setItem('auth', value);
};
/**
 * Get Cookie
 * @param name
 * @return {string}
 */
export const getCookie = () => {
  return localStorage.getItem('auth');
};

/**
 * Delete Cookie
 * @param name
 * @param path
 */
export const deleteCookie = () => {
  localStorage.removeItem('auth');
};

// Secret key
const BIT_128_KEY = [1, 12, 13, 2, 3, 4, 5, 14, 7, 8, 9, 10, 11, 15, 16, 6];

/**
 * Encrypt Data
 * @param value
 * @return {*}
 */
export const encryptData = (value) => {
  const textBytes = aesjs.utils.utf8.toBytes(value);
  const aesCtr = new aesjs.ModeOfOperation.ctr(BIT_128_KEY, new aesjs.Counter(5));
  const encryptedBytes = aesCtr.encrypt(textBytes);
  return aesjs.utils.hex.fromBytes(encryptedBytes);
};

/**
 * Format Number
 * @param x
 * @return {string}
 */
export const formatNumber = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Decrypt Data
 * @param encryptedHex
 * @return {*}
 */
export const decryptData = (encryptedHex) => {
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
  const aesCtr = new aesjs.ModeOfOperation.ctr(BIT_128_KEY, new aesjs.Counter(5));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  return aesjs.utils.utf8.fromBytes(decryptedBytes);
};

export const getSortColumn = (column) => {
  switch (column) {
    case 'userEmail' :
      return 'email';
    case 'companyCode' :
      return 'company_code';
    case 'companyName':
      return 'company_name';
    case 'role' :
      return 'authority';
    default :
      return column;
  }
};


