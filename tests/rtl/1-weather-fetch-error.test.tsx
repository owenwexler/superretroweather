import { afterEach, describe, expect, test } from 'bun:test';
import { fireEvent, screen } from '@testing-library/react';
import { renderHome } from './renderHome';
import { getWeatherDataMock } from './mockServerFunctions';

describe('Weather fetch error', () => {
  afterEach(() => {
    getWeatherDataMock.mockReset();
  });

  test('searching a location shows the error message when the weather API call fails', async () => {
    getWeatherDataMock.mockImplementationOnce(() => Promise.reject(new Error('mock API failure')));

    renderHome();

    fireEvent.input(screen.getByPlaceholderText('Enter location...'), { target: { value: 'Nowhere, XX' } });
    fireEvent.click(screen.getByText('SEARCH'));

    expect(await screen.findByText('I AM ERROR.')).toBeVisible();
    expect(screen.getByText('Something has gone wrong.')).toBeVisible();
    expect(screen.getByText('Please try again.')).toBeVisible();
  });
});
