import { PropFunction, component$ } from '@builder.io/qwik';
import { IDynamicObject } from '~/typedefs/IDynamicObject';

interface IClickableTextProps {
  textId: string;
  text: string;
  clickFunction?: PropFunction<(args: IDynamicObject) => void>;
}

export default component$((props: IClickableTextProps) => {
  const { textId, text, clickFunction } = props;
  return (
    <p
      id={textId}
      onClick$={clickFunction}
      class="text-sm max-lg:text-xs cursor-pointer underline text-white hover:text-gray-400 active:text-gray-500 scale-95 transition-transform duration-[10ms]">
        {text}
    </p>
  )
});