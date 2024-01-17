import { component$ } from '@builder.io/qwik';

export interface ISRWInputProps {
  inputId: string;
  inputPlaceholder: string;
}

export default component$((props: ISRWInputProps) => {
  const {
    inputId,
    inputPlaceholder
  } = props;

  return (
    <input
      class="bg-black border border-4 border-white text-white p-3 text-xs max-md:ml-6 max-sm:w-3"
      id={inputId}
      type="text"
      placeholder={inputPlaceholder}
    />
  );
});