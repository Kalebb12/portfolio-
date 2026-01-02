import { skillsList } from "../constants";
import { AnimationContainer } from "./common/AnimationContainer";
const Skills = () => {
  return (
    <AnimationContainer className="lg:py-15 py-10 px-4 lg:px-20" id="skills">
      <div className="container flex flex-col items-center gap-5 mx-auto lg:px-8">
        <h2 className="font-normal md:text-[48px] text-[28px]">
          My <span className="font-extrabold">Skills</span>
        </h2>

        <div className="py-5 flex items-center gap-5 lg:gap-17 flex-wrap justify-center">
          {skillsList.map((skill, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-8 items-center hover:bg-(--black) transition-all hover:text-white justify-center lg:w-46 size-37 lg:h-46 rounded border-2 p-6 border-(--black)"
              >
                <i className={`${skill.icon} text-[40px]`}></i>
                <span className="text-lg">{skill.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AnimationContainer>
  );
};

export default Skills;
