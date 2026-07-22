import { describe, expect, test } from 'bun:test';
import { screen } from '@testing-library/react';
import { renderHome } from './renderHome';

describe('Default message', () => {
  test('default message is rendered on page load', () => {
    renderHome();

    expect(screen.getByText(/IT'S DANGEROUS TO NOT KNOW THE WEATHER!/)).toBeVisible();
    expect(screen.getByText(/Enter your location above or pick one of your previous saved locations./)).toBeVisible();
  });
});
