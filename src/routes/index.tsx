import { createFileRoute } from '@tanstack/react-router'
import NavbarSection from '#/components/Navbar/NavbarSection';
import Navbar from '#/components/Navbar/Navbar';
import ResponsiveLogo from '#/components/style/ResponsiveLogo';
import Search from '#/components/Navbar/Search';
import SavedLocations from '#/components/Navbar/SavedLocations';
import MobileResponsiveSpacerGroup from '#/components/MobileResponsiveSpacerGroup';
import OpenSourceStatement from '#/components/OpenSourceStatement';
import ClientContainer from '#/components/ClientContainer';
import { env } from '#/env';

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Navbar>
        <NavbarSection>
          <ResponsiveLogo />
          <Search />
        </NavbarSection>
        <SavedLocations />
      </Navbar>
      <main>
        <section className="flex min-h-screen flex-col items-center justify-start mt-10">
          <div className="flex h-screen w-4/6 max-sm:w-full max-sm:p-3 flex-col items-center justify-start py-9 max-sm:py-9 pb-10">
            <MobileResponsiveSpacerGroup />
            
            <ClientContainer />

            <OpenSourceStatement />
            <p className="p-10" />
          </div>
				</section>
			</main>
    </>
  )
}
