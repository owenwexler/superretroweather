import type { FC } from 'react';

interface ClientSpacerProps {
  size: number;
}

const ClientSpacer: FC<ClientSpacerProps> = ({ size }) => {
  return (
    <p className={`mt-${size}`} />
  )
}

export default ClientSpacer;
