import { skillsList } from "../constants";
import { AnimationContainer } from "./common/AnimationContainer";
const Skills = () => {
  return (
    <AnimationContainer className="lg:py-[60px] py-10 px-4 lg:px-[80px]" id="skills">
      <div className="container flex flex-col items-center gap-5 mx-auto lg:px-8">
        <h2 className="font-normal md:text-[48px] text-[28px]">
          My <span className="font-extrabold">Skills</span>
        </h2>

        <div className="py-5 flex items-center gap-5 lg:gap-[71px] flex-wrap justify-center">
          {skillsList.map((skill, index) => {
            return (
              <div key={index} className="flex flex-col gap-8 items-center hover:bg-[var(--black)] transition-all hover:text-white justify-center lg:w-[186px] w-[150px] h-[150px] lg:h-[186px] rounded border-2 p-6 border-[var(--black)]">
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
