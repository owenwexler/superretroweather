import { useAtom } from 'jotai';
import { currentLocationAtom, savedLocationsAtom } from '../../store/weatherStore';
import { srwTransparentInput } from '../style/twClasses/inputClasses';
import { srwTransparentButton } from '../style/twClasses/buttonClasses';
import { addLocation } from '../../helper/savedLocationFunctions';
import { LOCAL_STORAGE_KEY } from '../../data/localStorageKey';
import { useState } from 'react';


const Search: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);
  const [savedLocations, setSavedLocations] = useAtom(savedLocationsAtom);

  const [value, setValue] = useState('');

  const setInputValue = (val: string) => {
    setCurrentLocation(val);
    const newSavedLocations = addLocation(val, savedLocations);
    setSavedLocations(newSavedLocations);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSavedLocations));

    setValue('');
  }

  const onInput = (e: any) => {
    setValue(e.currentTarget.value)
  }

  const handleKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      if (value === '') {
        return;
      }

      setInputValue(value);
    }
  };

  const handleClick = () => {
    if (value === '') {
      return;
    }

    setInputValue(value);
  }

  return (
    <div className="flex flex-row items-center justify-center space-x-5 max-md:space-x-8 max-md:pr-4">
      <input
        id="srw-search-input"
        type="text"
        value={value}
        onInput={onInput}
        onKeyUp={handleKeyUp}
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
