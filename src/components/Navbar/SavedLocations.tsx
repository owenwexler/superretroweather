import { clickableText } from "../style/twClasses/clickableTextClasses";

import ClientNavbarSeparator from "./ClientNavbarSeparator";

import { useEffect } from 'react';
import { useAtom } from "jotai";
import { currentLocationAtom, savedLocationsAtom } from "#/store/weatherStore";


const SavedLocations: React.FC = () => {
  const [savedLocations, setSavedLocations] = useAtom(savedLocationsAtom);
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);

  const handleLocationLinkClick = (location: string) => {
    setCurrentLocation(location);
  }

  useEffect(() => {
    const savedLocationResponse = localStorage.getItem('srw::userlocations');
    const savedLocationData = savedLocationResponse ? JSON.parse(savedLocationResponse) : [];
    setSavedLocations(savedLocationData);
  }, [])

  const justifyClass = savedLocations.length === 1 ? 'justify-center' : 'justify-between';


  return (
    <>
      {
        savedLocations.length > 0
        ?
        <>
          <ClientNavbarSeparator />
          <section id="srw-saved-locations-section" className={`flex flex-row max-lg:flex-col ${justifyClass} max-sm:justify-center items-center pl-3 pr-4 max-md:pl-1 max-md:pr-1 max-sm:space-y-2 py-3`}>
            {
              savedLocations.map(location => {
                const locationId = location.split(' ').join('-').replace(',', '').toLowerCase()
                return (
                  <button key={`saved-location-${locationId}`} id={`saved-location-${locationId}`} className={clickableText} onClick={() => handleLocationLinkClick(location)}>{location}</button>
                )
            })
            }
          </section>
        </>
        :
        null
      }
    </>
  )
}

export default SavedLocations;
