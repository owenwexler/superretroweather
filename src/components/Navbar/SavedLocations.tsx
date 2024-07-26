import { clickableText } from "../style/twClasses/clickableTextClasses";

import { $currentLocation } from "../../store/weatherStore";
import ClientNavbarSeparator from "./ClientNavbarSeparator";
import ClientNavbarSection from "./ClientNavbarSection";

import { $savedLocations } from "../../store/weatherStore";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";

const SavedLocations: React.FC = () => {
  const locations = useStore($savedLocations);

  const handleLocationLinkClick = (location: string) => {
    $currentLocation.set(location);
  }

  useEffect(() => {
    const savedLocationResponse = localStorage.getItem('srw::userlocations');
    const savedLocationData = savedLocationResponse ? JSON.parse(savedLocationResponse) : [];
    $savedLocations.set(savedLocationData);
  }, [])

  const justifyClass = locations.length === 1 ? 'justify-center' : 'justify-between';

  return (
    <>
      {
        locations.length > 0
        ?
        <>
          <ClientNavbarSeparator />
          <section id="srw-saved-locations-section" className={`flex flex-row max-md:flex-col ${justifyClass} max-sm:justify-center items-center pl-3 pr-4 max-md:pl-1 max-md:pr-1 max-sm:space-y-2 py-3`}>
            {
              locations.map(location => <button key={`saved-location-${location}`} className={clickableText} onClick={() => handleLocationLinkClick(location)}>{location}</button>)
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