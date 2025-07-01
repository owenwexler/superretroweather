import type { FC } from 'preact/compat';
import { getPicNameFromCondition } from '../../helper/getPicNameFromCondition';
import type { TConditionImageType } from '../../typedefs/TConditionImageType';

interface WeatherConditionImageProps {
  imageId: string;
  condition: TConditionImageType;
  width: number;
  height: number;
}

const WeatherConditionImage: FC<WeatherConditionImageProps> = ({ imageId, condition, width, height }) => {
  const { PUBLIC_CLIENT_ENV } = import.meta.env;

  const environment = PUBLIC_CLIENT_ENV && ['development', 'production'].includes(PUBLIC_CLIENT_ENV) ? PUBLIC_CLIENT_ENV.toString() : 'production';

  const picName = getPicNameFromCondition(condition);

  // this is to keep broken image links from happening in both production and dev 
  // for some reason in dev in the newer versions of Astro '/public' has to be appended to the beginning of a URL to keep image links from being broken
  // but then when we do this image links are broken in production
  // so here we are doing this hacky nonsense :eyeroll:
  const baseUrl = `images/weather/${picName}?url&jsx`;
  const url = environment === 'production' ? `/${baseUrl}` : `/public/${baseUrl}`;

  return (
    <img
      id={imageId}
      src={url}
      alt={condition}
      height={height}
      width={width}
    />
  )
}

export default WeatherConditionImage;
