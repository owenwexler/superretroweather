import { blankVCResponse } from '#/data/blankVCResponse';
import { sleep } from '#/helper/sleep';

import type { IOfflineWeatherDataLookup } from '#/typedefs/IOfflineWeatherData';
import type { IVCWeatherResponse } from '#/typedefs/IVCWeatherResponse';

import { dallas } from './VCMockData/dallas';
import { dc } from './VCMockData/dc';
import { denver } from './VCMockData/denver';
import { la } from './VCMockData/la';
import { malaga } from './VCMockData/malaga';
import { nashville } from './VCMockData/nashville';
import { orlando } from './VCMockData/orlando';
import { toronto } from './VCMockData/toronto';
import { vb } from './VCMockData/vb';

const getOfflineWeatherData = async (text: string): Promise<IVCWeatherResponse> => {
  await sleep(1500);

  if (text === '') { return blankVCResponse }

  const lookup: IOfflineWeatherDataLookup = {};
  lookup['Dallas, TX'] = { ...dallas };
  lookup['Washington, DC'] = { ...dc } ;
  lookup['Denver, CO'] = { ...denver } ;
  lookup['Los Angeles, CA'] = { ...la } as unknown as IVCWeatherResponse;
  lookup['Malaga, Spain'] = { ...malaga };
  lookup['Nashville, TN'] = { ...nashville };
  lookup['Orlando, FL'] = { ...orlando } as unknown as IVCWeatherResponse;
  lookup['Toronto, Canada'] = { ...toronto };
  lookup['Virginia Beach, VA'] = { ...vb };

  const result: IVCWeatherResponse = lookup[text as keyof typeof lookup].location.address !== '' ? lookup[text as keyof typeof lookup] : { ...blankVCResponse, error: 'not found' } ;

  return result;
}

export {
  getOfflineWeatherData
}

