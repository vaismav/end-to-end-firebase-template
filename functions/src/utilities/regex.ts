export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * strong password Regex
 * strong level password that has at least one lowercase letter,
 * one uppercase letter, one digit, one special character,
 * and is at least eight characters long.
 */
export const STRONG_PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

export const ISRAEL_PHONE_NUMBERS_REGEX = /^\+(972)(([23489]{1}\d{7})|[5]{1}\d{8})$/;
