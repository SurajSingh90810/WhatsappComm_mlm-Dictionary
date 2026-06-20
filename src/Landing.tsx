import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Ensure this path is correct
import img1 from "../src/assets/1.jpeg";
import img2 from "../src/assets/2.jpeg";
import img3 from "../src/assets/3.jpeg";
import img4 from "../src/assets/4.jpeg";
import img5 from "../src/assets/5.jpeg";
import img6 from "../src/assets/6.jpeg";
import img7 from "../src/assets/7.jpeg";

const achievementSlides = [img1, img2, img3, img4, img5, img6, img7];

function Landing() {
  const navigate = useNavigate();

  // --- Carousel State & Logic ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === achievementSlides.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? achievementSlides.length - 1 : prev - 1,
    );
  };

  // Autoplay functionality with hover pause
  useEffect(() => {
    if (isHovered) return;
    const slideInterval = setInterval(nextSlide, 3500); // 3.5 seconds
    return () => clearInterval(slideInterval);
  }, [isHovered]);

  // --- Handlers & Other Logic ---
  const handleJoinClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    if (e) e.preventDefault();

    if (typeof window !== "undefined") {
      const win = window as Window & {
        fbq?: (action: string, eventName: string) => void;
      };

      if (win.fbq) {
        win.fbq("track", "Lead");
      }
    }

    navigate("/form");
  };

  // Scroll animation logic for roadmap boxes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-16");
          } else {
            entry.target.classList.remove("opacity-100", "translate-y-0");
            entry.target.classList.add("opacity-0", "translate-y-16");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Background Elements */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-30 z-0"></div>
      <div className="fixed top-[-5%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-yellow-500/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-5%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-yellow-600/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Main Container */}
      <main className="relative z-10 overflow-x-hidden bg-black">
        {/* Hero Section */}
        <section className="w-full">
          <div className="relative w-full flex flex-col items-center overflow-hidden">
            {/* Desktop Image */}
            <img
              alt="Hero Image Desktop"
              className="w-full h-auto object-cover hidden md:block"
              src="/hero.png"
              fetchPriority="high"
            />
            {/* Clickable Area for Desktop */}
            <a
              href="/form"
              onClick={handleJoinClick}
              className="absolute hidden md:block cursor-pointer z-30 bg-transparent hover:bg-white/10 transition-colors rounded-2xl"
              style={{ top: "80%", left: "1.7%", width: "35%", height: "13%" }}
              aria-label="Access Form"
            ></a>

            {/* Mobile Image */}
            <img
              alt="Hero Image Mobile"
              className="w-full h-auto object-cover block md:hidden"
              src="/mobilehero.png"
              fetchPriority="high"
            />
            {/* Clickable Area for Mobile */}
            <a
              href="/form"
              onClick={handleJoinClick}
              className="absolute block md:hidden cursor-pointer z-30 bg-transparent hover:bg-white/10 transition-colors rounded-2xl"
              style={{ top: "42%", left: "15%", width: "70%", height: "9%" }}
              aria-label="Access Form"
            ></a>
          </div>
        </section>

        {/* --- PROFESSIONAL CAROUSEL SECTION --- */}
        <section className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 relative z-20">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 font-display text-white tracking-tight">
              Goaldex{" "}
              <span className="text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                Legends
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Unstoppable achievements unlocked by our top performers.
            </p>
          </div>

          {/* Clean Wrapper: No background box, perfectly sized for portrait flyers */}
          <div
            className="relative w-full max-w-[320px] sm:max-w-[420px] mx-auto group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Viewport (Hides overflowing slides) */}
            <div className="overflow-hidden rounded-2xl shadow-[0_15px_50px_-12px_rgba(234,179,8,0.25)] relative">
              {/* Smooth Gliding Track */}
              <div
                className="flex transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {achievementSlides.map((slide, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 flex items-center justify-center"
                  >
                    <img
                      src={slide}
                      alt={`Legend ${index + 1}`}
                      className="w-full h-auto object-cover rounded-2xl"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Hover-reveal Navigation Arrows (Positioned Outside Image) */}
            <button
              onClick={prevSlide}
              className="absolute -left-6 sm:-left-16 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-yellow-500/30 text-yellow-500 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full hover:bg-yellow-500 hover:text-black hover:scale-110 transition-all duration-300 shadow-xl z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-6 sm:-right-16 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-yellow-500/30 text-yellow-500 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full hover:bg-yellow-500 hover:text-black hover:scale-110 transition-all duration-300 shadow-xl z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            {/* External Minimalist Indicators */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {achievementSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                    currentSlide === index
                      ? "bg-yellow-500 w-8 shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                      : "bg-gray-700 w-2 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Roadmap Section */}
        <section className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-24 pb-16 relative">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 font-display text-white">
              Modern Retail <span className="text-yellow-500">Roadmap</span>{" "}
              2026
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Building a seamless, personalized, and efficient modern retail
              environment.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 border-l-2 border-yellow-500/20 -translate-x-1/2 opacity-60 z-0"></div>

            {/* Phase 01 */}
            <div className="reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 ease-out relative flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 sm:mb-16 z-10 w-full">
              <div className="absolute left-6 lg:left-1/2 top-0 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 bg-black border-2 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)] p-3 sm:p-4 rounded-full z-20 transition-transform duration-300 hover:scale-110 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-yellow-500 text-xl sm:text-2xl w-[1em] h-[1em]"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>

              <div className="w-full lg:w-[45%] pl-16 lg:pl-0 lg:pr-12 lg:text-right">
                <div className="glass p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-yellow-500/30 hover:border-yellow-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)] bg-black/80 backdrop-blur-xl">
                  <span className="text-yellow-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase block mb-2 text-left lg:text-right">
                    Phase 01
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    Unified Inventory Systems
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed text-left lg:text-right">
                    Integrating physical and online stores for real-time
                    inventory visibility and cross-channel purchasing.
                  </p>
                </div>
              </div>
              <div className="hidden lg:block lg:w-[45%]"></div>
            </div>

            {/* Phase 02 */}
            <div className="reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 ease-out delay-100 relative flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 sm:mb-16 z-10 w-full">
              <div className="hidden lg:block lg:w-[45%]"></div>
              <div className="absolute left-6 lg:left-1/2 top-0 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 bg-black border-2 border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.3)] p-3 sm:p-4 rounded-full z-20 transition-transform duration-300 hover:scale-110 flex items-center justify-center">
                <span className="material-icons-round text-yellow-400 text-xl sm:text-2xl leading-none">
                  insights
                </span>
              </div>

              <div className="w-full lg:w-[45%] pl-16 lg:pl-12 text-left">
                <div className="glass p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-yellow-400/30 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(234,179,8,0.12)] bg-black/80 backdrop-blur-xl">
                  <span className="text-yellow-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase block mb-2">
                    Phase 02
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    Customer Data Platform
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Harnessing customer insights to create personalized
                    profiles, targeted marketing, and predictive analytics.
                  </p>
                </div>
              </div>
            </div>

            {/* Phase 03 */}
            <div className="reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 ease-out delay-200 relative flex flex-col lg:flex-row items-start lg:items-center justify-between z-10 w-full">
              <div className="absolute left-6 lg:left-1/2 top-0 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 bg-black border-2 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)] p-3 sm:p-4 rounded-full z-20 transition-transform duration-300 hover:scale-110 flex items-center justify-center">
                <span className="material-icons-round text-yellow-500 text-xl sm:text-2xl leading-none">
                  auto_graph
                </span>
              </div>

              <div className="w-full lg:w-[45%] pl-16 lg:pl-0 lg:pr-12 lg:text-right">
                <div className="glass p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-yellow-500/30 hover:border-yellow-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)] bg-black/80 backdrop-blur-xl">
                  <span className="text-yellow-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase block mb-2 text-left lg:text-right">
                    Phase 03
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    Advanced Retail Automation
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed text-left lg:text-right">
                    Implementing AI for supply chain optimization, automated
                    fulfillment, and personalized in-store technology.
                  </p>
                </div>
              </div>
              <div className="hidden lg:block lg:w-[45%]"></div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto pt-16 pb-24 sm:pb-32 px-4 sm:px-6 relative z-20">
          <div className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-black border border-yellow-500/20 shadow-2xl backdrop-blur-3xl group transition-all duration-500 hover:border-yellow-500/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.08),transparent_50%)]"></div>

            <div className="relative z-10 p-6 sm:p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10">
              <div className="w-full lg:w-7/12 text-center lg:text-left relative">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-white relative z-10 leading-tight">
                  Get More Info With Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
                    Growth!
                  </span>
                </h2>
                <div className="flex flex-col gap-3 sm:gap-4 relative z-10">
                  <p className="text-gray-400 text-sm sm:text-base font-light italic mt-1 sm:mt-2">
                    "Then access our site for complete insights."
                  </p>
                </div>

                <div className="hidden lg:block absolute -right-32 xl:-right-40 top-[55%] xl:top-[60%] -translate-y-1/2 w-32 xl:w-40 z-0 pointer-events-none">
                  <img
                    src="/arrow.webp"
                    alt="Arrow Direction"
                    className="w-full h-auto opacity-70 invert drop-shadow-[0_0_15px_rgba(234,179,8,0.4)] animate-arrow-flow"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* CTA BUTTON AREA */}
              <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-end relative z-20">
                <div
                  onClick={handleJoinClick}
                  className="relative w-full sm:w-auto cursor-pointer group"
                >
                  <div className="absolute -inset-5 z-0 rounded-[2rem]"></div>
                  <button className="relative z-10 w-full sm:w-auto bg-yellow-500 text-black hover:bg-yellow-400 px-3 min-[375px]:px-5 md:px-10 py-3 md:py-5 rounded-xl flex items-center justify-center gap-2 min-[375px]:gap-3 transition-all transform group-hover:scale-[1.03] active:scale-95 shadow-[0_0_30px_rgba(234,179,8,0.3)] overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0"></div>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-xl min-[375px]:text-2xl md:text-3xl w-[1em] h-[1em] shrink-0 group-hover:-rotate-12 transition-transform relative z-10"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span className="text-[12px] min-[375px]:text-[14px] md:text-lg font-bold uppercase tracking-wider whitespace-normal sm:whitespace-nowrap relative z-10 leading-tight">
                      Access Private Channel
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-yellow-500/10 py-6 md:py-8 bg-black/90 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] md:text-xs font-bold text-gray-500 tracking-widest uppercase">
            <a className="hover:text-yellow-500 transition-colors" href="#">
              Privacy
            </a>
            <a className="hover:text-yellow-500 transition-colors" href="#">
              Terms
            </a>
            <a className="hover:text-yellow-500 transition-colors" href="#">
              Contact
            </a>
          </div>
          <p className="text-gray-600 text-[10px] md:text-sm text-center">
            Copyright © 2026 All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Landing;
