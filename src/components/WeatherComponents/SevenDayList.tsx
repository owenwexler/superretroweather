import type { FC } from 'preact/compat';
import type { IVCWeatherDayValueSet } from '../../typedefs/IVCWeatherDayValueSet'
import SevenDayListItem from './SevenDayListItem';

interface SevenDayListProps {
  sevenDayList: IVCWeatherDayValueSet[];
  location: string;
}

const SevenDayList: FC<SevenDayListProps> = ({ sevenDayList, location }) => {
  return (
    <div className="flex flex-col mt-9">
      <h2 id="seven-day-header" className="text-2xl mt-9 mb-2 text-white">SEVEN-DAY FORECAST</h2>
      <div className='flex flex-col space-y-8'>
        {
          sevenDayList.map((item, idx) => {
            return (
              <SevenDayListItem
                key={`seven-day-list-item-${location}-${idx}-${item.datetimeStr}`}
                sevenDayListItem={item}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default SevenDayList