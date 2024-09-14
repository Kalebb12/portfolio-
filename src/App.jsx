// import MyExperience from "./components/experience"
import Hero from "./components/hero"
import Navbar from "./components/navbar"
import Skills from "./components/skills"
import AboutMe from "./components/aboutMe"
import Projects from "./components/projects"
import Testimonial from "./components/testimonial"

function App() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Navbar/>
      <Hero/>
      <Skills/>
      {/* //TODO Add Experiences */}
      {/* <MyExperience/> */}

      <AboutMe />
      <Projects/>
      <Testimonial />
    </div>
  )
}

export default App
