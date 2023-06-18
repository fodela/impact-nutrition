"use client";
import Logo from "./Logo";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <div className="w-full fixed bg-black p-4 top-0 left-0">
      <header className="flex max-w-screen-xl mx-auto justify-between items-center px-6 top-0">
        <Logo />
        <NavBar />
      </header>
    </div>

  );
};

export default Header;
