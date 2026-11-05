import { beforeAll, describe, expect, test } from 'bun:test';
import { assertEnvironmentReady, requestWeather, uniqueTestIp } from './apiTestHelpers';

const rejectedLocations = [
  { name: 'a single word with no comma or digit', location: 'Washington' },
  { name: 'a script tag', location: '<script>, x' },
  { name: 'an ampersand that would add a query parameter', location: 'Paris, TX&x=1' },
  { name: 'a trailing comma', location: 'Paris,' },
  { name: 'an empty string', location: '' },
  { name: 'a location over 100 characters', location: `${'1'.repeat(101)}, TX` },
  { name: 'latitude out of range', location: '91,0' },
  { name: 'longitude out of range', location: '0,181' }
];

describe('Weather route validation', () => {
  beforeAll(async () => {
    await assertEnvironmentReady();
  });

  for (const { name, location } of rejectedLocations) {
    test(`rejects ${name} with 400 invalid_location`, async () => {
      const response = await requestWeather(location, uniqueTestIp());
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.error.code).toBe('invalid_location');
      expect(body.data).toBeNull();
    });
  }

  // These forms are accepted by validation.  The response may still be an error from Visual Crossing or the offline data,
  // so this checks only that validation let the request through.
  const acceptedLocations = [
    { name: 'city and state', location: 'Dallas, TX' },
    { name: 'postal code', location: '20190' },
    { name: 'coordinates', location: '38.9697,-77.3850' },
    { name: 'street address', location: '1600 Pennsylvania Avenue NW, Washington, DC' }
  ];

  for (const { name, location } of acceptedLocations) {
    test(`accepts ${name} past validation`, async () => {
      const response = await requestWeather(location, uniqueTestIp());
      const body = await response.json();

      expect(response.status).not.toBe(400);
      expect(body.error?.code).not.toBe('invalid_location');
    });
  }
});
