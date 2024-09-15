import type { FC } from "preact/compat";

interface ResponsiveLogoTextProps {
  id: string;
  children: any;
}

const ResponsiveLogoText: FC<ResponsiveLogoTextProps> = ({ id, children }) => {
  return (
    <p
      id={id}
      class="text-2xl max-sm:text-[20px] max-sm:pb-4 cursor-pointer text-white hover:text-gray-400 active:text-gray-500 scale-95 transition-transform duration-[10ms]"
    >
      {children}
    </p>
  )
}

export default ResponsiveLogoText