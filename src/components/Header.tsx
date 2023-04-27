import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <div className="">Logo</div>
      <NavBar />
      <button className="text-xl px-4 py-2 bg-colorPrimary text-white rounded">
        Login/Signup
      </button>
    </header>
  );
};

export default Header;
