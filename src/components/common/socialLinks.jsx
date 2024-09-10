import { socialMediaPreferences } from "../../constants";
const SocialLinks = () => {
  return (
    <div className="flex items-center gap-8">
      {socialMediaPreferences.map((profile, index) => {
        return (
          <a
            href={profile.url}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[56px] w-[56px] rounded-lg p-4 border-2 flex justify-center items-center border-[var(--black)] hover:bg-black hover:text-white transition-all"
          >
            <i className={profile.icon} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
