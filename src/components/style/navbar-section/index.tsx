import { Slot, component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section id="srw-navbar-inner" class="p-2 flex justify-around pr-3 pl-3 py-3 pb-3 items-center">
      <Slot />
    </section>
  )
});