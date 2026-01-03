// import MyExperience from "./components/experience"
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Skills from "./components/skills";
import AboutMe from "./components/aboutMe";
import Projects from "./components/projects";
import Testimonial from "./components/testimonial";
import ContactMe from "./components/contactMe";
import Footer from "./components/footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

function App() {
  library.add(fas, far, fab);
  return (
    <div>
      <Navbar />
      <Hero />
      <Skills />
      {/* //TODO Add Experiences */}
      {/* <MyExperience/> */}

      <AboutMe />
      <Projects />
      <Testimonial />
      <ContactMe />
      <Footer />
    </div>
  );
}

export default App;
