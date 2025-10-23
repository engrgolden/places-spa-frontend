import NavLinks from "./NavLinks";

const SideDrawer = () => {
  return (
    <section className="fixed top-0 left-0 flex flex-col items-center justify-center z-30 bg-white text-black h-full w-2/3 ">
      <NavLinks />
    </section>
  );
};

export default SideDrawer;
