import Footer from "../footer";
import JobSearchIntro from "./jobSearchIntro";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 md:px-6">
        <JobSearchIntro />
      </main>

      <Footer />
    </div>
  )
}
export default LandingPage