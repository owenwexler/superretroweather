import { component$ } from '@builder.io/qwik';
import { getPicNameFromCondition } from '~/helper/getPicNameFromCondition';
import type { TConditionImageType } from '~/typedefs/TConditionImageType';

interface IWeatherConditionImageProps {
  condition: TConditionImageType;
  width: number;
  height: number;
}

export default component$((props: IWeatherConditionImageProps) => {
  const { condition, width, height } = props;

  const picName = getPicNameFromCondition(condition);

  return (
    <img
      src={`/images/istock/${picName}?url&jsx`}
      height={height}
      width={width}
    />
  )
});