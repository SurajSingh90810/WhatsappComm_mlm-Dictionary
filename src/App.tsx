import { useEffect } from "react";
import "./App.css";

function App() {
  // Handle Button Clicks
  // Handle Button Clicks
  const handleJoinClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    if (e) e.preventDefault();

    // Trigger native Meta Pixel event safely without 'any'
    if (typeof window !== "undefined") {
      // Create a safely typed version of window just for this block
      const win = window as Window & {
        fbq?: (action: string, eventName: string) => void;
      };

      if (win.fbq) {
        win.fbq("track", "Lead");
      }
    }

    const telegramLink = import.meta.env.VITE_TELEGRAM_LINK;

    if (telegramLink) {
      window.open(telegramLink, "_blank", "noopener,noreferrer");
    } else {
      console.error("Telegram Link is missing!");
    }
  };

  // Fetch live crypto prices

  // Add scroll animation logic for the roadmap boxes
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
      {/* Background Elements (Updated to Gold) */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-30 z-0"></div>
      <div className="fixed top-[-5%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-yellow-500/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-5%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-yellow-600/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Main Container */}
      <main className="relative z-10 overflow-x-hidden bg-black">
        {/* Hero Section */}
        {/* Hero Section */}
        <section className="w-full">
          <div className="relative w-full flex flex-col items-center">
            {/* Desktop Image */}
            <img
              alt="Hero Image Desktop"
              className="w-full h-auto object-cover hidden md:block"
              src="/hero.png"
              fetchPriority="high"
            />

            {/* Clickable Area for Desktop */}
            <a
              href="https://t.me/+tks5bJG6GiFiYTFh"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleJoinClick}
              className="absolute hidden md:block cursor-pointer z-30 bg-transparent hover:bg-white/10 transition-colors rounded-2xl"
              style={{
                top: "72%",
                left: "3%",
                width: "25%",
                height: "12%",
              }}
              aria-label="Contact Us on Telegram"
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
              href="https://t.me/+tks5bJG6GiFiYTFh"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleJoinClick}
              // NOTE: Change 'bg-transparent' to 'bg-red-500/50' temporarily to see where this box is on your phone!
              className="absolute block md:hidden cursor-pointer z-30 bg-transparent hover:bg-white/10 transition-colors rounded-2xl"
              style={{
                top: "88%", // Move up/down (Increase % to move down)
                left: "25%", // Move left/right (Increase % to move right)
                width: "50%", // Make box wider/narrower
                height: "10%", // Make box taller/shorter
              }}
              aria-label="Contact Us on Telegram"
            ></a>
          </div>
        </section>

        {/* Strategic Roadmap Section */}
        <section className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-16 relative">
          <div className="text-center mb-20 sm:mb-32">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 font-display text-white">
              Decentralized <span className="text-yellow-500">Roadmap</span>{" "}
              2026
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto">
              Building a transparent, educational, and community-driven Web3
              infrastructure.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative px-2 sm:px-4">
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 roadmap-line -translate-x-1/2 opacity-40 z-0 border-l border-yellow-500/30"></div>

            {/* Phase 01 */}
            <div className="reveal-on-scroll opacity-0 translate-y-16 transition-[opacity,transform] duration-1000 ease-out relative flex items-center justify-between mb-12 sm:mb-16 flex-col lg:flex-row z-10">
              <div className="w-full pl-14 lg:pl-0 lg:w-[45%] mb-4 lg:mb-0">
                <div className="glass p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-yellow-500/30 relative group hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)] bg-black/80 backdrop-blur-xl">
                  <span className="text-yellow-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase block text-left lg:text-right mb-2">
                    Phase 01
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-left lg:text-right">
                    Web3 Community Hub
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-left lg:text-right">
                    Join our decentralized network for timely blockchain
                    updates, educational resources, and daily industry insights.
                  </p>
                </div>
              </div>
              <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 bg-black border-2 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)] p-3 sm:p-4 rounded-full z-20 transition-transform duration-300 hover:scale-110 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-yellow-500 text-xl sm:text-2xl w-[1em] h-[1em]"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div className="hidden lg:block lg:w-[45%]"></div>
            </div>

            {/* Phase 02 */}
            <div className="reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 ease-out delay-100 relative flex items-center justify-between mb-12 sm:mb-16 flex-col lg:flex-row z-10">
              <div className="hidden lg:block lg:w-[45%]"></div>
              <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 bg-black border-2 border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.3)] p-3 sm:p-4 rounded-full z-20 transition-transform duration-300 hover:scale-110 flex items-center justify-center">
                <span className="material-icons-round text-yellow-400 text-xl sm:text-2xl">
                  insights
                </span>
              </div>
              <div className="w-full pl-14 lg:pl-0 lg:w-[45%] mt-4 lg:mt-0">
                <div className="glass p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-yellow-400/30 relative group hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(234,179,8,0.12)] bg-black/80 backdrop-blur-xl">
                  <span className="text-yellow-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase block mb-2 text-left">
                    Phase 02
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-left">
                    Decentralized Literacy
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-left">
                    Access comprehensive guides on DeFi technology and empower
                    yourself with foundational blockchain knowledge.
                  </p>
                </div>
              </div>
            </div>

            {/* Phase 03 */}
            <div className="reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 ease-out delay-200 relative flex items-center justify-between flex-col lg:flex-row z-10">
              <div className="w-full pl-14 lg:pl-0 lg:w-[45%] mb-4 lg:mb-0">
                <div className="glass p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-yellow-500/30 relative group hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)] bg-black/80 backdrop-blur-xl">
                  <span className="text-yellow-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase block text-left lg:text-right mb-2">
                    Phase 03
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-left lg:text-right">
                    Ecosystem Expansion
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-left lg:text-right">
                    Continuous development of decentralized tools with a focus
                    on transparency, security frameworks, and seamless user
                    experience.
                  </p>
                </div>
              </div>
              <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 bg-black border-2 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)] p-3 sm:p-4 rounded-full z-20 transition-transform duration-300 hover:scale-110 flex items-center justify-center">
                <span className="material-icons-round text-yellow-500 text-xl sm:text-2xl">
                  auto_graph
                </span>
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
              {/* Left Side (Text) */}
              <div className="lg:w-7/12 text-center lg:text-left relative w-full">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-5 text-white relative z-10">
                  Secure Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
                    Competitive Edge!
                  </span>
                </h2>
                <div className="flex flex-col gap-3 sm:gap-4 text-center md:text-left relative z-10">
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base font-light italic mt-1 sm:mt-2">
                    "Turn data into alpha. Leverage institutional flow to
                    dominate the decentralized frontier."
                  </p>
                </div>

                <div className="hidden lg:block absolute -right-32 xl:-right-40 top-[55%] xl:top-[60%] -translate-y-1/2 w-32 xl:w-40 z-0 pointer-events-none">
                  <img
                    src="/arrow.webp"
                    alt="Arrow"
                    className="w-full h-auto opacity-70 invert drop-shadow-[0_0_15px_rgba(234,179,8,0.4)] animate-arrow-flow"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* CTA BUTTON AREA - Gold Theme */}
              <div className="lg:w-5/12 flex flex-col items-center lg:items-end w-full relative z-20">
                <div
                  onClick={handleJoinClick}
                  className="relative w-full sm:w-auto cursor-pointer group"
                >
                  <div className="absolute -inset-5 z-0 rounded-[2rem]"></div>

                  <button className="relative z-10 w-full sm:w-auto bg-yellow-500 text-black hover:bg-yellow-400 px-6 py-5 sm:px-12 rounded-xl flex items-center justify-center gap-2 sm:gap-4 transition-all transform group-hover:scale-[1.03] active:scale-95 shadow-[0_0_30px_rgba(234,179,8,0.3)] overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0"></div>

                    {/* Proper WhatsApp SVG Icon for CTA Button */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-2xl sm:text-3xl w-[1em] h-[1em] shrink-0 group-hover:-rotate-12 transition-transform relative z-10"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>

                    <span className="text-[14px] sm:text-lg font-bold uppercase tracking-widest whitespace-nowrap relative z-10">
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
      <footer className="border-t border-yellow-500/10 py-8 bg-black/90 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex flex-wrap justify-center items-center gap-4 md:space-x-8 md:gap-0 text-[10px] md:text-xs font-bold text-gray-500 tracking-widest uppercase">
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

export default App;
