import { afterEach, describe, expect, test } from 'bun:test';
import { fireEvent, screen } from '@testing-library/react';
import { renderHome } from './renderHome';
import { weatherApiMock } from './mockWeatherApi';

describe('Weather fetch error', () => {
  afterEach(() => {
    weatherApiMock.mockClear();
  });

  test('searching a location shows the error message when the weather API route fails', async () => {
    weatherApiMock.mockImplementationOnce(async () =>
      Response.json(
        {
          data: null,
          error: {
            code: 'mock_api_failure',
            message: 'mock API failure',
            details: 'The weather route failed',
            hint: 'Check the server logs'
          }
        },
        { status: 500 }
      )
    );

    renderHome();

    fireEvent.input(screen.getByPlaceholderText('Enter location...'), { target: { value: 'Nowhere, XX' } });
    fireEvent.click(screen.getByText('SEARCH'));

    expect(await screen.findByText('I AM ERROR.')).toBeVisible();
    expect(screen.getByText('Something has gone wrong.')).toBeVisible();
    expect(screen.getByText('Please try again.')).toBeVisible();
  });
});
