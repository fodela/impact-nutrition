import Image from "next/image";
import Link from "next/link";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FiFacebook } from "react-icons/fi";

type TeamMemberDetails = {
  name: string;
  position: string;
  imageLink: string;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
};
export function TeamMember({ member }: { member: TeamMemberDetails }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 overflow-hidden py-8 gap-8 ">
      <div className=" pt-5 relative  w-[290px]">
        {" "}
        <Image
          src={`/assets/Images/${member.imageLink}`}
          height={300}
          width={250}
          alt={`a picture of ${member.name}`}
          className="absolute -translate-y-4 -translate-x-1/2 left-1/2"
        />
        <div className="bg-[#3D3A35] h-[260px] w-[250px]  rounded-xl  mx-auto">
          {" "}
          <div className="flex flex-col items-center mx-auto bg-white w-9/12 py-5 px-1 rounded-lg absolute bottom-14 left-1/2 -translate-x-1/2 ">
            <p className="text-lg font-bold text-black">{member.name}</p>

            <p className="text-[#637381] text-sm">{member.position}</p>
          </div>
        </div>
        <div className="flex w-full gap-4 mx-auto p-2 m-4 justify-center text-dark rounded-md z-30">
          <Link href={member.facebookLink}>
            <FiFacebook size={20} />
          </Link>
          <Link href={member.facebookLink}>
            <BsTwitter size={20} />
          </Link>
          <Link href={member.facebookLink}>
            <BsInstagram size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
