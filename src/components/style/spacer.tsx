import { component$ } from "@builder.io/qwik";

interface ISpacerProps {
  size: number;
}

export default component$((props: ISpacerProps) => {
  const size = props.size ? props.size : 10;
  return (
    <div class={`mt-${size}`} />
  );
});