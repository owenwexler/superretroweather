import { Slot, component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section id="srw-navbar-inner" class="p-2 flex flex-row max-sm:flex-col justify-between max-sm:justify-center pr-3 max-sm:pr-7 md:pl-3 py-3 pb-3 items-center max-sm:space-y-2">
      <Slot />
    </section>
  )
});