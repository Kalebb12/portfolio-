import { AnimationContainer } from "./common/AnimationContainer";
import ContactForm from "./templates/form";

const ContactMe = () => {
  return (
    <AnimationContainer
      className="sm:py-15 sm:px-10 py-10 px-4"
      id="contact-me"
    >
      <div className="container flex flex-col-reverse items-center justify-center mx-auto xl:items-start xl:justify-between xl:flex-row sm:px-8">
        <div className="flex flex-1 py-5">
          <ContactForm />
        </div>
        <div className="flex-1 py-5">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col xl:p-5 max-w-95 xl:max-w-full ">
              <h1 className="font-extrabold md:text-[48px] text-[28px] tracking-[-2%]">
                Let’s <span className="text-outline">talk</span> for <br />{" "}
                Something special
              </h1>
              <p className="text-(--zinc-500)">
                I seek to push the limits of creativity to create high-engaging,
                user-friendly, and memorable interactive experiences.
              </p>

              <h3 className="font-bold text-[20px]">
                2021.cee.jay@gmail.com <br />
                07083112827
              </h3>
            </div>
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
};

export default ContactMe;
