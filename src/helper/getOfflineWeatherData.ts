import type  { IOfflineWeatherDataLookup } from '~/typedefs/IOfflineWeatherData';
import type { IVCWeatherResponse } from '~/typedefs/IVCWeatherResponse';

import dallas from '../data/VCMockData/dallas.json';
import dc from '../data/VCMockData/dc.json';
import denver from '../data/VCMockData/denver.json';
import la from '../data/VCMockData/la.json';
import malaga from '../data/VCMockData/malaga.json';
import nashville from '../data/VCMockData/nashville.json';
import orlando from '../data/VCMockData/orlando.json';
import toronto from '../data/VCMockData/toronto.json';
import vb from '../data/VCMockData/vb.json';

const getOfflineWeatherData = (): IOfflineWeatherDataLookup => {
  const result: IOfflineWeatherDataLookup = {};
  result['Dallas, TX'] = dallas as unknown as IVCWeatherResponse;
  result['Washington, DC'] = dc as unknown as IVCWeatherResponse;
  result['Denver, CO'] = denver as unknown as IVCWeatherResponse;
  result['Los Angeles, CA'] = la as unknown as IVCWeatherResponse;
  result['Malaga, Spain'] = malaga as unknown as IVCWeatherResponse;
  result['Nashville, TN'] = nashville as unknown as IVCWeatherResponse;
  result['Orlando, FL'] = orlando as unknown as IVCWeatherResponse;
  result['Toronto, Canada'] = toronto as unknown as IVCWeatherResponse;
  result['Virginia Beach, VA'] = vb as unknown as IVCWeatherResponse;

  return result;
}

export {
  getOfflineWeatherData
}