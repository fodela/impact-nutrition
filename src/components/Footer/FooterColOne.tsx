import Link from "next/link";

import { ImFacebook, ImLinkedin2, ImTwitter } from "react-icons/im";
import { BsEnvelopeFill } from "react-icons/bs";

const FooterColOne = () => {
  return (
    <div className="1 flex flex-col gap-6 ">
      <div>Logo</div>
      <div className="">
        <p>info@nutritionconsultgh.com</p>
        <p>Address line 1, address line 2</p>
      </div>
      <div>
        <p>Follow us:</p>
        <div className="flex gap-4 text-white pt-2">
          <div className="social_handle">
            <Link href="/">
              <ImFacebook className="social_handle" />
            </Link>
          </div>

          <span className="social_handle">
            <Link href="/">
              <ImLinkedin2 className="social_handle" />
            </Link>
          </span>

          <div className="social_handle">
            <Link href="/">
              <ImTwitter className="social_handle" />
            </Link>
          </div>

          <div className="social_handle">
            <Link href="/">
              <BsEnvelopeFill className="social_handle" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterColOne;
