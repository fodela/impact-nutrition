import { TeamMember } from "./TeamMember";

const teamMembersDetails = [
  {
    name: "Raphael Kwabena Angmortey",
    position: "Administrative Director",
    imageLink: "raphael_angmortey.png",
    facebookLink: "facebook.com",
    twitterLink: "twitter.com",
    instagramLink: "instagram.com",
  },
  {
    name: "Irene Afi Puplampu",
    position: "Projects Director",
    imageLink: "irene.png",
    facebookLink: "facebook.com",
    twitterLink: "twitter.com",
    instagramLink: "instagram.com",
  },
  {
    name: "Jessica Naa Ayele Doe",
    position: "Deputy Projects Director",
    imageLink: "jessica_doe.png",
    facebookLink: "facebook.com",
    twitterLink: "twitter.com",
    instagramLink: "instagram.com",
  },

  {
    name: "Raphael Odame",
    position: "Monitoring & Evaluation Director",
    imageLink: "raphael_odame.png",
    facebookLink: "facebook.com",
    twitterLink: "twitter.com",
    instagramLink: "instagram.com",
  },
  {
    name: "William Dormechele",
    position: "Information Technology Director",
    imageLink: "willi.png",
    facebookLink: "facebook.com",
    twitterLink: "twitter.com",
    instagramLink: "instagram.com",
  },
  
];

const SectionTeam = () => {
  return (
    <section className="my-64 flex flex-col w-full items-center max-w-screen-xl mx-auto px-8 ">
      <h2 className="text-4xl sm:text-6xl font-medium text-center">
        Meet Our Team
      </h2>
      <div className="justify-self-center grid sm:grid-cols-2 overflow-x-auto  lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
        {teamMembersDetails.map((member, index) => (
          <TeamMember key={index} member={member} />
        ))}
      </div>
    </section>
  );
};

export default SectionTeam;
