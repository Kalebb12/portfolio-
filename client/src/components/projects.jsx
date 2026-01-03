import { projects } from "../constants";
import ProjectComponent from "./common/projectsComponent";
import { AnimationContainer } from "./common/AnimationContainer";
import { useEffect, useState } from "react";
import { sanityClient } from "../client";
const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const data = await sanityClient.fetch(
          `*[_type == "projects"]{
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
    }`
        );
        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
          {projects.map((project, i) => {
            return (
              <ProjectComponent project={{ ...project }} index={i} key={i} />
            );
          })}
        </div>
      </div>
    </AnimationContainer>
  );
};

export default Projects;
