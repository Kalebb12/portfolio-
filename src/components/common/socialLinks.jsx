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
            className="flex items-center justify-center p-4 transition-all border-2 border-black rounded-lg size-14 hover:bg-black hover:text-white"
          >
            <i className={profile.icon} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;