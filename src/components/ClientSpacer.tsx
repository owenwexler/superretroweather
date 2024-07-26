interface ClientSpacerProps {
  size: number;
}

const ClientSpacer: React.FC<ClientSpacerProps> = ({ size }) => {
  return (
    <p className={`mt-${size}`} />
  )
}

export default ClientSpacer;