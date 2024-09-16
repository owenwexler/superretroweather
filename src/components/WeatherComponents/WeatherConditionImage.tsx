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
  const picName = getPicNameFromCondition(condition);

  return (
    <img
      id={imageId}
      src={`/images/weather/${picName}?url&jsx`}
      alt={condition}
      height={height}
      width={width}
    />
  )
}

export default WeatherConditionImage;