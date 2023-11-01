import { Slot, component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <nav id="srw-navbar-outer" class="fixed w-full top-0 z-50 bg-black border-b border-b-4 border-b-white">
      <section id="srw-navbar-inner" class="p-2 flex justify-between pr-3 pl-3 py-3 pb-3 items-center">
        <Slot />
      </section>
    </nav>
  )
});