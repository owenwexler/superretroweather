import type { FC } from 'preact/compat';

interface ClientSpacerProps {
  size: number;
}

const ClientSpacer: FC<ClientSpacerProps> = ({ size }) => {
  return (
    <p className={`mt-${size}`} />
  )
}

export default ClientSpacer;