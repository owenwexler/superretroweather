// we have a separate HomePage component so that both the app and the RTL sad path mock can access the full homepage without exporting the actual Home component in routes, which interferes with code splitting

import NavbarSection from '#/components/Navbar/NavbarSection';
import Navbar from '#/components/Navbar/Navbar';
import ResponsiveLogo from '#/components/style/ResponsiveLogo';
import Search from '#/components/Navbar/Search';
import SavedLocations from '#/components/Navbar/SavedLocations';
import MobileResponsiveSpacerGroup from '#/components/MobileResponsiveSpacerGroup';
import OpenSourceStatement from '#/components/OpenSourceStatement';
import ClientContainer from '#/components/ClientContainer';

const HomePage = () => {
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

export default HomePage
