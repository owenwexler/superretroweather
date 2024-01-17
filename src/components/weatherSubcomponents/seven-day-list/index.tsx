import { component$ } from '@builder.io/qwik';

import type { IVCWeatherDayValueSet } from '~/typedefs/IVCWeatherDayValueSet';
import SevenDayListItem from '../seven-day-list-item';

interface ISevenDayListProps {
  cityName: string;
  sevenDayData: IVCWeatherDayValueSet[];

}

export default component$((props: ISevenDayListProps) => {
  const { cityName, sevenDayData } = props;

  return (
    <div class="flex flex-col mt-9">
      <h2 class="text-2xl mt-9 mb-2 text-white">SEVEN-DAY FORECAST</h2>
      {
        sevenDayData.map(sevenDayListItem => {
          return <SevenDayListItem
            key={`seven-day-item-${cityName}-${sevenDayListItem.datetimeStr}`}
            sevenDayListItem={sevenDayListItem}
          />
        })
      }
    </div>
  )
});