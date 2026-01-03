import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetcher } from "../../hooks/useFetcher";
const SocialLinks = () => {
  const query = `*[_type == "socialLinks"]{
        title,
        img,
        url,
        icon
      }`;

  const { data, isLoading, error } = useFetcher(query);
  return (
    <div className="flex items-center gap-8">
      {data &&
        data.map((profile, index) => {
          return (
            <a
              href={profile.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              title={profile.title}
              className="flex items-center justify-center p-4 transition-all border-2 border-black rounded-lg size-14 hover:bg-black hover:text-white"
            >
              <FontAwesomeIcon icon={profile.icon} />
            </a>
          );
        })}

      {isLoading &&
        Array(3)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="size-14 rounded-lg bg-black animate-pulse"
            />
          ))}
    </div>
  );
};

export default SocialLinks;
