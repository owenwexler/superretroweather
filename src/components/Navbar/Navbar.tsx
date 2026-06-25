import type { FC } from 'react';

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: FC<NavbarProps> = ({ children }) => {
  return (
    <nav id="srw-navbar-outer" className="fixed w-full top-0 z-50 bg-black border-b border-b-4 border-b-white">
      { children }
    </nav>
  )
}

export default Navbar;
