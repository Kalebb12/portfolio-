// import MyExperience from "./components/experience"
import Hero from "./components/hero"
import Navbar from "./components/navbar"
import Skills from "./components/skills"
import AboutMe from "./components/aboutMe"
import Projects from "./components/projects"
import Testimonial from "./components/testimonial"
import ContactMe from "./components/contactMe"
import Footer from "./components/footer"

function App() {
  return (
    <div className="">
      <Navbar/>
      <Hero/>
      <Skills/>
      {/* //TODO Add Experiences */}
      {/* <MyExperience/> */}

      <AboutMe />
      <Projects/>
      <Testimonial />
      <ContactMe />
      <Footer/>
    </div>
  )
}

export default App
