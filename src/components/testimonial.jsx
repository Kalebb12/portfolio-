import Marquee from "react-fast-marquee";
import CardComponent from "./common/cardComponent";
import { testimonials } from "../constants";
import { AnimationContainer } from "./common/AnimationContainer";

const Testimonial = () => {
  return (
    <AnimationContainer className="sm:py-[60px] sm:px-10 py-10 px-4">
      <div className="flex flex-col items-center sm:px-8 sm:gap-5">
        <div className="py-5">
          <h2 className="font-normal text-[28px] sm:text-[48px]">
            My <span className="font-extrabold">Testimonial</span>
          </h2>
        </div>
        <Marquee gradient={false}  speed={60} pauseOnClick z->
          <div className="flex items-center justify-between w-full gap-10 p-5 m:gap-3">
            {
              testimonials.map((testimony , i)=> {
                return <CardComponent testimony={testimony} key={i} bg={i%2 === 0 ? "black" : "white"} text={i%2 === 0 ? "--white" : "--neutral"} hr={i%2 === 0 ? "white" : "black"} />
              })
            }
          </div>
        </Marquee>
      </div>
    </AnimationContainer>
  );
};

export default Testimonial;
