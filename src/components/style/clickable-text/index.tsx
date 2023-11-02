import { component$ } from '@builder.io/qwik';

interface IClickableTextProps {
  text: string;
}

export default component$((props: IClickableTextProps) => {
  const { text } = props;
  return (
    <p class="text-sm max-sm:text-xs cursor-pointer underline text-white hover:text-gray-400 active:text-gray-500 scale-95 transition-transform duration-[10ms]">{text}</p>
  )
});