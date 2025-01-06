import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";
import Trending from "../components/Trending";
import FAQs from "../components/FAQs";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <main data-aos="fade relative">
            <Navbar />
            <Hero />
            <div className="px-3 md:px-10 lg:px-36 max-w-[1500px] mx-auto">
                <Trending />
                <HowItWorks />
                <FAQs />
            </div>
            <Footer />
        </main>
    )
}