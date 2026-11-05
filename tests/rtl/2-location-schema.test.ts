import { describe, expect, test } from 'bun:test';
import { locationSchema } from '#/schemas/locationSchema';

const isAccepted = (value: string): boolean => locationSchema.safeParse(value).success;

describe('Location schema', () => {
  test('accepts city, state or country locations', () => {
    expect(isAccepted('Washington, DC')).toBe(true);
    expect(isAccepted('London, UK')).toBe(true);
    expect(isAccepted("Coeur d'Alene, ID")).toBe(true);
    expect(isAccepted('Stratford-upon-Avon, United Kingdom')).toBe(true);
    expect(isAccepted('São Paulo, Brazil')).toBe(true);
  });

  test('accepts postal and ZIP codes', () => {
    expect(isAccepted('20190')).toBe(true);
    expect(isAccepted('20190-1234')).toBe(true);
    expect(isAccepted('SW1A 1AA')).toBe(true);
  });

  test('accepts latitude,longitude coordinates', () => {
    expect(isAccepted('38.9697,-77.3850')).toBe(true);
    expect(isAccepted('-33.87, 151.21')).toBe(true);
  });

  test('rejects coordinates outside the valid range', () => {
    expect(isAccepted('91,0')).toBe(false);
    expect(isAccepted('0,181')).toBe(false);
  });

  test('accepts street and partial addresses', () => {
    expect(isAccepted('1600 Pennsylvania Avenue NW, Washington, DC')).toBe(true);
    expect(isAccepted('Apt #4, Main St.')).toBe(true);
  });

  test('rejects bare words without a comma or digit', () => {
    expect(isAccepted('Washington')).toBe(false);
    expect(isAccepted('London')).toBe(false);
  });

  test('rejects characters that would change the query string', () => {
    expect(isAccepted('Paris, TX&key=abc')).toBe(false);
    expect(isAccepted('Paris, TX?x=1')).toBe(false);
    expect(isAccepted('10% off, TX')).toBe(false);
  });

  test('rejects a trailing comma', () => {
    expect(isAccepted('Paris,')).toBe(false);
  });

  test('rejects empty and oversized input', () => {
    expect(isAccepted('')).toBe(false);
    expect(isAccepted('1'.repeat(101))).toBe(false);
  });
});
