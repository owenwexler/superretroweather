import { Slot, component$ } from '@builder.io/qwik';

interface IButtonProps {
  buttonId: string;
}

export default component$((props: IButtonProps) => {
  const {
    buttonId
  } = props;

  return (
    <button id={buttonId} class="rounded-none bg-black border border-white border-4 m-1 p-2 active:scale-95 transition-transform duration-[10ms]">
      <Slot />
    </button>
  )
});