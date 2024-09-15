import type { FC } from 'preact/compat';
import { getPicNameFromCondition } from '../../helper/getPicNameFromCondition';
import type { TConditionImageType } from '../../typedefs/TConditionImageType';

interface WeatherConditionImageProps {
  condition: TConditionImageType;
  width: number;
  height: number;
}

const WeatherConditionImage: FC<WeatherConditionImageProps> = ({ condition, width, height }) => {
  const picName = getPicNameFromCondition(condition);

  return (
    <img
      src={`/images/weather/${picName}?url&jsx`}
      alt={condition}
      height={height}
      width={width}
    />
  )
}

export default WeatherConditionImage;