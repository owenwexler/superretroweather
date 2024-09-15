import { $savedLocations } from '../store/weatherStore';
import { useStore } from '@nanostores/preact';
import ClientSpacer from './ClientSpacer';
import type { FC } from 'preact/compat';

const MobileResponsiveSpacerGroup: FC = () => {
  const savedLocations = useStore($savedLocations);

  return (
    <>
      <ClientSpacer size={10} />
      <ClientSpacer size={10} />
      <ClientSpacer size={10} />
      <ClientSpacer size={5} />

      {/* this complete mess is required to make everything show up on mobile. */}
      <div className="hidden max-lg:block">
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
      </div>
      {
        savedLocations.length > 3
        ?
        <>
          <div className="hidden max-lg:block">
            <ClientSpacer size={12} />
            <ClientSpacer size={12} />
            <ClientSpacer size={12} />
            <ClientSpacer size={12} />
          </div>
          <div className="hidden max-lg:block">
            <ClientSpacer size={12} />
            <ClientSpacer size={12} />
            <ClientSpacer size={12} />
            <ClientSpacer size={10} />
            <ClientSpacer size={10} />
            <ClientSpacer size={10} />
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