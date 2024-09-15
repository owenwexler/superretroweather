import type { FC } from 'preact/compat';

const NavbarSection: FC<{ children: any }> = ({ children }) => {
  return (
    <section id="srw-navbar-inner" className="flex flex-row max-lg:flex-col justify-between max-lg:justify-center items-center pl-3 pr-4 max-md:pl-1 max-lg:pr-1 max-sm:space-y-2 py-3">
      {children}
    </section>
  )
}

export default NavbarSection;