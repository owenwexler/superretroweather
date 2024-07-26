import { sleep } from './sleep';

import dallas from '../data/VCMockData/dallas.json';
import dc from '../data/VCMockData/dc.json';
import denver from '../data/VCMockData/denver.json';
import la from '../data/VCMockData/la.json';
import malaga from '../data/VCMockData/malaga.json';
import nashville from '../data/VCMockData/nashville.json';
import orlando from '../data/VCMockData/orlando.json';
import toronto from '../data/VCMockData/toronto.json';
import vb from '../data/VCMockData/vb.json';

import blankVCResponse from '../data/blankVCResponse.json';

import type { IOfflineWeatherDataLookup } from '../typedefs/IOfflineWeatherData';
import type { IVCWeatherResponse } from '../typedefs/IVCWeatherResponse';

const getOfflineWeatherData = async (text: string): Promise<IVCWeatherResponse> => {
  await sleep(1500);

  if (text === '') { return blankVCResponse as unknown as IVCWeatherResponse }

  const lookup: IOfflineWeatherDataLookup = {};
  lookup['Dallas, TX'] = dallas as unknown as IVCWeatherResponse;
  lookup['Washington, DC'] = dc as unknown as IVCWeatherResponse;
  lookup['Denver, CO'] = denver as unknown as IVCWeatherResponse;
  lookup['Los Angeles, CA'] = la as unknown as IVCWeatherResponse;
  lookup['Malaga, Spain'] = malaga as unknown as IVCWeatherResponse;
  lookup['Nashville, TN'] = nashville as unknown as IVCWeatherResponse;
  lookup['Orlando, FL'] = orlando as unknown as IVCWeatherResponse;
  lookup['Toronto, Canada'] = toronto as unknown as IVCWeatherResponse;
  lookup['Virginia Beach, VA'] = vb as unknown as IVCWeatherResponse;

  const result: IVCWeatherResponse = lookup[text as keyof typeof lookup] ? lookup[text as keyof typeof lookup] as IVCWeatherResponse : { ...blankVCResponse, error: 'not found' } as unknown as IVCWeatherResponse;

  return result;
}

export {
  getOfflineWeatherData
}