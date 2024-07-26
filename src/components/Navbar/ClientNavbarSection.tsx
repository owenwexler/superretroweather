interface ClientNavbarSectionProps {
  children: React.ReactNode;
}

const ClientNavbarSection: React.FC<ClientNavbarSectionProps> = ({ children }) => {
  return (
    <section id="srw-navbar-inner" className="flex flex-row max-md:flex-col justify-between max-md:justify-center items-center pl-3 pr-4 max-md:pl-1 max-md:pr-1 max-sm:space-y-2 py-3">
      {children}
    </section>
  )
}

export default ClientNavbarSection;