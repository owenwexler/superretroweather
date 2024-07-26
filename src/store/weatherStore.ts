import { atom } from 'nanostores';

import blankVCResponse from '../data/blankVCResponse.json';

import type { IVCWeatherResponse } from '../typedefs/IVCWeatherResponse';

const typedBlankVCResponse = blankVCResponse as unknown as IVCWeatherResponse;

export const $currentWeatherData = atom<IVCWeatherResponse>(typedBlankVCResponse);

export const $currentLocation = atom<string>('');

export const $savedLocations = atom<string[]>([]);