// Shared Zod schemas for user-entered locations.  Lives in src/schemas/ so it can be imported from both client components and server routes.  Schemas here must not import server-only libraries.
import z from 'zod';

// The forms Visual Crossing's Timeline Weather API accepts for the location parameter:
// 1. City, state or country: "Washington, DC", "London, UK"
// 2. Postal or ZIP code: "20190", "20190-1234", "SW1A 1AA"
// 3. Latitude,longitude: "38.9697,-77.3850" (latitude first)
// 4. Full or partial address: "1600 Pennsylvania Avenue NW, Washington, DC"

export const LOCATION_MAX_LENGTH = 100;

export const LOCATION_FORMAT_MESSAGE = 'Use CITY, STATE, CITY, COUNTRY, a postal or ZIP code, latitude,longitude, or a street address';

// One name part of a city/state/country location: starts with a letter, then letters, combining marks, spaces, periods, apostrophes, or hyphens.
// Examples: "Washington", "St. Louis", "Coeur d'Alene", "Stratford-upon-Avon", "São Paulo"
const NAME_PART = String.raw`\p{L}[\p{L}\p{M} .'-]*`;

const CITY_STATE_REGEX = new RegExp(`^${NAME_PART},\\s*${NAME_PART}$`, 'u');

// Digits, optionally with letters, spaces, or hyphens, and at least one digit: "20190", "20190-1234", "SW1A 1AA".  The digit requirement keeps bare words such as "London" out.
const POSTAL_CODE_REGEX = /^(?=.*\d)[A-Za-z0-9][A-Za-z0-9 -]{2,11}$/;

// Latitude and longitude as decimal numbers separated by a comma.  Range is checked separately.
const COORDINATES_REGEX = /^-?\d{1,3}(\.\d+)?,\s*-?\d{1,3}(\.\d+)?$/;

// Street addresses and partial addresses.  Letters, digits, spaces, and . , ' # / - are allowed, which excludes characters that would change the query string such as & ? % + and ;.  Must contain a letter, and either a digit or a comma, so bare words like "Washington" are rejected.  Must end with a letter, digit, or period, so a trailing comma like "Paris," is rejected.
const ADDRESS_REGEX = /^(?=.*\p{L})(?=.*[\p{N},])[\p{L}\p{M}\p{N} .,'#/-]*[\p{L}\p{M}\p{N}.]$/u;

const isValidCoordinates = (value: string): boolean => {
  const [latitudeText, longitudeText] = value.split(',');
  const latitude = Number(latitudeText);
  const longitude = Number(longitudeText);

  return Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;
}

export const isValidLocation = (value: string): boolean => {
  if (COORDINATES_REGEX.test(value)) {
    return isValidCoordinates(value);
  }

  return (
    CITY_STATE_REGEX.test(value) ||
    POSTAL_CODE_REGEX.test(value) ||
    ADDRESS_REGEX.test(value)
  );
}

export const locationSchema = z
  .string()
  .trim()
  .max(LOCATION_MAX_LENGTH)
  .refine(isValidLocation, { message: LOCATION_FORMAT_MESSAGE });
