import {  socialMediaPreferences } from "../../constants";
const SocialLinks = () => {
  return (
    <div className="flex gap-8 items-center">
      {socialMediaPreferences.map((profile, index) => {
        return (
          <a
            href={profile.url}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              index == 0 && "bg-black "
            } h-[56px] w-[56px] rounded-lg p-4 border-2 flex justify-center items-center border-[var(--black)]`}
          >
            <img src={profile.icon} alt={profile.title + " icon"} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
