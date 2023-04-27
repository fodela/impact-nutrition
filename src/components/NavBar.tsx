import Link from "next/link";

const NavBar = () => {
  return (
    <ul className="flex gap-4 text-xl">
      <li>
        <Link href={"/"}> Home</Link>
      </li>
      <li>
        <Link href="/about"> About</Link>
      </li>
      <li>
        <Link href="/services"> Services</Link>
      </li>
      <li>
        <Link href="/blog"> Blog</Link>
      </li>
      <li>
        <Link href="/contact_us"> Contact us</Link>
      </li>
    </ul>
  );
};

export default NavBar;
