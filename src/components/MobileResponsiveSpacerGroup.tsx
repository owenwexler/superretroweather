import { $savedLocations } from "../store/weatherStore";
import { useStore } from "@nanostores/react";
import ClientSpacer from "./ClientSpacer";

const MobileResponsiveSpacerGroup = () => {
  const savedLocations = useStore($savedLocations);

  return (
    <>
      <ClientSpacer size={10} />
      <ClientSpacer size={10} />
      <ClientSpacer size={10} />
      {/* this complete mess is required to make everything show up on mobile. */}
      <div className="md:hidden">
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
      </div>
      {
        savedLocations.length > 3
        ?
        <>
          <div className="md:hidden">
            <ClientSpacer size={10} />
            <ClientSpacer size={10} />
            <ClientSpacer size={10} />
          </div>
          <div className="md:hidden">
            <ClientSpacer size={10} />
          </div>
        </>
        :
        null
      }
    </>
  )
}

export default MobileResponsiveSpacerGroup;