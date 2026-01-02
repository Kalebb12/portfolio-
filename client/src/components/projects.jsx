import projectImg from "/image.png";
import { projects } from "../constants";
import ProjectComponent from "./common/projectsComponent";
import { AnimationContainer } from "./common/AnimationContainer";
const Projects = () => {
  return (
    <AnimationContainer
      id="project"
      className="sm:px-20 sm:py-[60px] py-10 px-4 bg-black text-white"
    >
      <div className="lg:px-[32px] container mx-auto flex flex-col items-center gap-[28px] lg:gap-5">
        <h1 className="lg:text-[48px] text-[28px] font-normal">
          My <span className="font-extrabold">Projects</span>
        </h1>
        <div>
          {projects.map((project, i) => {
            return <ProjectComponent project={{ ...project }} index={i} key={i} />;
          })}
        </div>
      </div>
    </AnimationContainer>
  );
};

export default Projects;
