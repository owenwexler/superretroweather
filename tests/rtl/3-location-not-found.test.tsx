import { afterEach, describe, expect, test } from 'bun:test';
import { fireEvent, screen } from '@testing-library/react';
import { renderHome } from './renderHome';
import { weatherApiMock } from './mockWeatherApi';

describe('Location not found', () => {
  afterEach(() => {
    weatherApiMock.mockClear();
  });

  test('searching a location the weather API cannot find shows the castle not-found page', async () => {
    weatherApiMock.mockImplementationOnce(async () =>
      Response.json({ data: { error: 'not found' }, error: null }, { status: 200 })
    );

    renderHome();

    fireEvent.input(screen.getByPlaceholderText('Enter location...'), { target: { value: 'Nowhere, XX' } });
    fireEvent.click(screen.getByText('SEARCH'));

    expect(await screen.findByText('THANK YOU WEATHER HUNTER!')).toBeVisible();
    expect(screen.getByText('BUT THIS PAGE IS IN ANOTHER CASTLE!')).toBeVisible();
    expect(screen.queryByText('I AM ERROR.')).toBeNull();
  });
});
