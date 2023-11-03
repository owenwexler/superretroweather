import { Slot, component$ } from '@builder.io/qwik';

interface IResponsiveLogoTextProps {
  textId: string;
}

export default component$((props: IResponsiveLogoTextProps) => {
  const { textId } = props;
  return (
    <p
      id={textId}
      class="text-2xl max-sm:text-lg cursor-pointer text-white hover:text-gray-400 active:text-gray-500 scale-95 transition-transform duration-[10ms]"
    >
      <Slot />
    </p>
  )
});