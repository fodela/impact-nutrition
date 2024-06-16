"use client";
import Logo from "./Logo";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <div className="w-full bg-background fixed p-4 top-0 left-0 z-20 shadow-md">
      <header className="flex  max-w-screen-2xl mx-auto justify-between items-center px-6 top-0">
        <Logo />
        <NavBar />
      </header>
    </div>
  );
};

export default Header;
