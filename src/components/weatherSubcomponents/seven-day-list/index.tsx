import { component$ } from '@builder.io/qwik';
import { formatDateMMDDYY } from '~/helper/formatDateMMDDYY';
import { formatTime } from '~/helper/formatTime';

import { getPicNameFromCondition } from '~/helper/getPicNameFromCondition';
import type { ICurrentConditions } from '~/typedefs/ICurrentConditions';
import { IVCWeatherDayValueSet } from '~/typedefs/IVCWeatherDayValueSet';

interface ISevenDayListProps {
  sevenDayData: IVCWeatherDayValueSet[];
}

export default component$((props: ISevenDayListProps) => {
  const { sevenDayData } = props;

  return (
    <div class="flex flex-col mt-5">

    </div>
  )
});