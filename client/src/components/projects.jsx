import ProjectComponent from "./common/projectsComponent";
import { AnimationContainer } from "./common/AnimationContainer";
import { ProjectSkeleton } from "./ProjectSkeleton";
import { useFetcher } from "../hooks/useFetcher";
const Projects = () => {
  const query = `*[_type == "projects"]{
        title,
        img,
        des,
        img{
          asset->{
            _id,
            url
          },
        },
        github_url,
        preview_url
      }`;
  const { data: projects, isLoading, error } = useFetcher(query);

  return (
    <AnimationContainer
      id="project"
      className="sm:px-20 sm:py-15 py-10 px-4 bg-black text-white"
    >
      <div className="lg:px-8 container mx-auto flex flex-col items-center gap-7 lg:gap-5">
        <h1 className="lg:text-[48px] text-[28px] font-normal">
          My <span className="font-extrabold">Projects</span>
        </h1>
        <div>
          {projects &&
            projects.map((project, i) => {
              return (
                <ProjectComponent project={{ ...project }} index={i} key={i} />
              );
            })}
        </div>
        {isLoading &&
          Array(3)
            .fill(null)
            .map((_, i) => (
              <div className="w-full" key={i}>
                <ProjectSkeleton i={i} />
              </div>
            ))}
      </div>
    </AnimationContainer>
  );
};

export default Projects;
