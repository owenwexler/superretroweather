import { atom } from 'nanostores';

import { blankVCResponse } from '../data/blankVCResponse';

import type { IVCWeatherResponse } from '../typedefs/IVCWeatherResponse';

export const $currentWeatherData = atom<IVCWeatherResponse>(blankVCResponse);

export const $currentLocation = atom<string>('');

export const $savedLocations = atom<string[]>([]);
