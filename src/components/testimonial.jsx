import CardComponent from "./common/cardComponent";

const Testimonial = () => {
  return (
    <div className="sm:py-[60px] sm:px-10 py-10 px-4">
      <div className="flex flex-col items-center px-8 sm:gap-5">
        <div className="py-5">
          <h2 className="font-normal text-[28px] sm:text-[48px]">
            My <span className="font-extrabold">Testimonial</span>
          </h2>
        </div>
        <div className="flex flex-col items-center justify-between w-full gap-10 p-5 lg:flex-row sm:gap-3 sm:py-10 sm:px-6">
          <CardComponent />
          <CardComponent bg="black" text="--white" hr="white"/>
          <CardComponent />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
