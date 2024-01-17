import { Slot, component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section id="srw-navbar-inner" class="flex flex-row max-md:flex-col justify-between max-md:justify-center items-center xl:px-3 max-sm:space-y-2 py-2">
      <Slot />
    </section>
  )
});