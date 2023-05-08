import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image src="assets/logo.svg" alt="logo" height={50} width={150} />
    </Link>
  );
};

export default Logo;
