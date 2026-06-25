import { atom } from 'jotai';

import { blankVCResponse } from '../data/blankVCResponse';

import type { IVCWeatherResponse } from '../typedefs/IVCWeatherResponse';

export const currentWeatherDataAtom = atom<IVCWeatherResponse>(blankVCResponse);

export const currentLocationAtom = atom<string>('');

export const savedLocationsAtom = atom<string[]>([]);
