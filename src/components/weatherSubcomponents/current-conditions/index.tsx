import { component$ } from '@builder.io/qwik';
import { formatDateMMDDYY } from '~/helper/formatDateMMDDYY';

import { getPicNameFromCondition } from '~/helper/getPicNameFromCondition';
import type { ICurrentConditions } from '~/typedefs/ICurrentConditions';

interface ICurrentConditionsProps {
  currentConditions: ICurrentConditions;
}

export default component$((props: ICurrentConditionsProps) => {
  const { currentConditions } = props;

  const picName = getPicNameFromCondition(currentConditions.icon);

  return (
    <div class="flex flex-col">
      <div class="flex flex-row space-x-5 items-center justify-center">
        <img src={`/images/istock/${picName}`} height="100" width="100"></img>
        <h1 class="text-white text-4xl mx-6">{Math.round(currentConditions.temp)}º</h1>
      </div>
      <h1 class="text-white text-4xl mx-6">{formatDateMMDDYY(currentConditions.datetime)}</h1>
    </div>
  )
});