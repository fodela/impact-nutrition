import Logo from "./Logo";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Logo />
      <NavBar />
    </header>
  );
};

export default Header;
