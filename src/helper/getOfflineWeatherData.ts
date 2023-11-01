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
  result['dallas'] = dallas as unknown as IVCWeatherResponse;
  result['dc'] = dc as unknown as IVCWeatherResponse;
  result['denver'] = denver as unknown as IVCWeatherResponse;
  result['la'] = la as unknown as IVCWeatherResponse;
  result['malaga'] = malaga as unknown as IVCWeatherResponse;
  result['nashville'] = nashville as unknown as IVCWeatherResponse;
  result['orlando'] = orlando as unknown as IVCWeatherResponse;
  result['toronto'] = toronto as unknown as IVCWeatherResponse;
  result['vb'] = vb as unknown as IVCWeatherResponse;

  return result;
}

export {
  getOfflineWeatherData
}