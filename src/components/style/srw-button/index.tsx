import { PropFunction, Slot, component$ } from '@builder.io/qwik';
import { IDynamicObject } from '~/typedefs/IDynamicObject';

interface IButtonProps {
  buttonId: string;
  clickFunction?: PropFunction<(args?: IDynamicObject) => void>;
}

export default component$((props: IButtonProps) => {
  const {
    buttonId,
    clickFunction
  } = props;

  return (
    <button
      id={buttonId}
      class="rounded-none bg-black border border-white border-4 m-1 p-2 active:scale-95 transition-transform duration-[10ms]"
      onClick$={clickFunction}
    >
      <Slot />
    </button>
  )
});