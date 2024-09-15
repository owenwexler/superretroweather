import { useStore } from '@nanostores/preact';
import { $currentLocation, $savedLocations } from '../../store/weatherStore';
import { srwTransparentInput } from '../style/twClasses/inputClasses';
import { srwTransparentButton } from '../style/twClasses/buttonClasses';
import { addLocation } from '../../helper/savedLocationFunctions';
import { LOCAL_STORAGE_KEY } from '../../data/localStorageKey';
import { useState } from 'preact/hooks';


const Search: React.FC = () => {
  const currentLocation = useStore($currentLocation);
  const savedLocations = useStore($savedLocations);

  const [value, setValue] = useState('');

  const onInput = (e: any) => {
    setValue(e.currentTarget.value)
  }

  const handleClick = () => {
    if (value === '') {
      return;
    }

    $currentLocation.set(value);
    const newSavedLocations = addLocation(value, savedLocations);
    $savedLocations.set(newSavedLocations);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSavedLocations));

    setValue('');
  }

  return (
    <div className="flex flex-row items-center justify-center space-x-5 max-md:space-x-8 max-md:pr-4">
      <input
        id="srw-search-input"
        type="text"
        value={value}
        onInput={onInput}
        className={srwTransparentInput}
        placeholder="Enter location..."
      />

      <button
        id="srw-search-button"
        type="button"
        onClick={handleClick}
        className={srwTransparentButton}
      >
        <p className="text-xs text-white">SEARCH</p>
      </button>
    </div>
  )
}

export default Search;