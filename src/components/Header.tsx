'use client'
import Logo from "./Logo";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="flex max-w-screen-xl mx-auto justify-between items-center">
      <Logo />
      <NavBar />
    </header>
  );
};

export default Header;
