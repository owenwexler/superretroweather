import type { FC } from 'react';
import { getPicNameFromCondition } from '../../helper/getPicNameFromCondition';
import type { TConditionImageType } from '../../typedefs/TConditionImageType';

interface WeatherConditionImageProps {
  imageId: string;
  condition: TConditionImageType;
  width: number;
  height: number;
}

const WeatherConditionImage: FC<WeatherConditionImageProps> = ({ imageId, condition, width, height }) => {
  const picName = getPicNameFromCondition(condition);
  const url = `/images/weather/${picName}`;

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
