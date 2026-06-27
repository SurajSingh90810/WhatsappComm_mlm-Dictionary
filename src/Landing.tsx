import  { useEffect, useState } from "react";
import {
  Network,
  Banknote,
  Wallet,
  LayoutDashboard,
  UserCog,
  Globe,
  Fingerprint,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./App.css"; // Ensure this path is correct

// New Logo Images
import logo1 from "../src/assets/13.png";
import logo2 from "../src/assets/14.png";
import logo3 from "../src/assets/15.png";
import logo4 from "../src/assets/16.png";
import logo5 from "../src/assets/17.png";
import logo6 from "../src/assets/18.png";

const logoSlides = [logo1, logo2, logo3, logo4, logo5, logo6];

// MLM Features Data
const mlmFeatures = [
  {
    title: "MLM योजना मैनेजमेंट",
    description:
      "एक कस्टम सॉफ़्टवेयर जो बाइनरी, मैट्रिक्स, यूनीलेवल, बोर्ड और जनरेशन जैसे सभी प्लान्स को सपोर्ट करता है।",
    icon: <Network className="w-8 h-8" />,
  },
  {
    title: "कमीशन और बोनस सिस्टम",
    description:
      "डायरेक्ट इनकम, लेवल इनकम, मैचिंग बोनस और लीडरशिप बोनस आदि की बिल्कुल सटीक और ऑटोमैटिक कैलकुलेशन।",
    icon: <Banknote className="w-8 h-8" />,
  },
  {
    title: "ई-वॉलेट इंटीग्रेशन",
    description:
      "आसान फंड ट्रांसफर, विड्रॉल (निकासी) और ट्रांजेक्शन ट्रैकिंग के लिए एक बेहद सुरक्षित ई-वॉलेट सिस्टम।",
    icon: <Wallet className="w-8 h-8" />,
  },
  {
    title: "मेंबर डैशबोर्ड",
    description:
      "एक यूज़र-फ्रेंडली डैशबोर्ड जहाँ मेंबर अपनी कमाई, नेटवर्क (Genealogy) और डाउनलाइन की परफॉरमेंस को आसानी से ट्रैक कर सकते हैं।",
    icon: <LayoutDashboard className="w-8 h-8" />,
  },
  {
    title: "एडमिन कंट्रोल पैनल",
    description:
      "यूज़र्स, कमीशन, पेआउट्स, रिपोर्ट्स और सेटिंग्स को आसानी से मैनेज करने के लिए एडमिन के पास पूरा कंट्रोल।",
    icon: <UserCog className="w-8 h-8" />,
  },
  {
    title: "रेप्लिकेटेड वेबसाइट्स",
    description:
      "MLM बिज़नेस को प्रमोट करने के लिए हर डिस्ट्रीब्यूटर को दी जाने वाली एक पर्सनलाइज़्ड (व्यक्तिगत) वेबसाइट।",
    icon: <Globe className="w-8 h-8" />,
  },
];

function Landing() {
  // --- Logo Carousel State & Logic ---
  const [currentLogoSlide, setCurrentLogoSlide] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(2);

  // Handle Responsive layout for Logo Carousel
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth >= 768 ? 3 : 2);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation Handlers for Arrows
  const nextSlide = () => {
    setCurrentLogoSlide((prev) =>
      prev >= logoSlides.length - itemsToShow ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentLogoSlide((prev) =>
      prev <= 0 ? logoSlides.length - itemsToShow : prev - 1,
    );
  };

  // Auto-slide logic
  useEffect(() => {
    const logoInterval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(logoInterval);
  }, [itemsToShow]);

  // --- Tracking Logic for WhatsApp Clicks ---
  const handleWhatsAppClick = () => {
    // We removed e.preventDefault() so the <a> tag naturally opens the WhatsApp link
    if (typeof window !== "undefined") {
      const win = window as Window & {
        fbq?: (action: string, eventName: string) => void;
      };

      if (win.fbq) {
        win.fbq("track", "Lead");
      }
    }
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
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-20 z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-teal-500/20 blur-[120px] md:blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-5%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-600/10 blur-[100px] md:blur-[130px] rounded-full pointer-events-none z-0"></div>

      {/* Main Container */}
      <main className="relative z-10 overflow-x-hidden bg-[#0B1120]">
        {/* Hero Section */}
        <section className="w-full">
          <div className="relative w-full flex flex-col items-center overflow-hidden">
            <img
              alt="Hero Image Desktop"
              className="w-full h-auto object-cover hidden md:block"
              src="/hero.png"
              fetchPriority="high"
            />
            <a
              href="https://wa.me/447412812865"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="absolute hidden md:block cursor-pointer z-30 bg-transparent hover:bg-white/10 transition-colors rounded-2xl"
              style={{ top: "80%", left: "1.7%", width: "35%", height: "13%" }}
              aria-label="Contact on WhatsApp"
            ></a>

            <img
              alt="Hero Image Mobile"
              className="w-full h-auto object-cover block md:hidden"
              src="/mobilehero.png"
              fetchPriority="high"
            />
            <a
              href="https://wa.me/447412812865"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="absolute block md:hidden cursor-pointer z-30 bg-transparent hover:bg-white/10 transition-colors rounded-2xl"
              style={{ top: "42%", left: "15%", width: "70%", height: "9%" }}
              aria-label="Contact on WhatsApp"
            ></a>
          </div>
        </section>

        {/* --- PARTNERS / LOGO CAROUSEL SECTION (WITH ARROWS) --- */}
        <section className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 relative z-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-sm sm:text-base font-bold text-slate-400 uppercase tracking-widest">
              Featured In & Trusted By
            </h3>
          </div>

          {/* Carousel Wrapper: मोबाइल में px-6 किया गया ताकि लोगो को जगह मिले */}
          <div className="max-w-6xl mx-auto relative px-6 sm:px-12">
            {/* Left Arrow Button: मोबाइल में पैडिंग और साइज कम किया गया */}
            <button
              onClick={prevSlide}
              className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-30 bg-slate-800/80 hover:bg-teal-500 text-teal-400 hover:text-slate-900 p-1.5 sm:p-2 rounded-full border border-teal-500/30 hover:border-teal-400 transition-all duration-300 shadow-md backdrop-blur-sm group"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Carousel Window */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentLogoSlide * (100 / itemsToShow)
                  }%)`,
                }}
              >
                {logoSlides.map((logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-2 sm:px-4"
                    style={{ width: `${100 / itemsToShow}%` }}
                  >
                    <div className="bg-white rounded-2xl p-2 sm:p-5 lg:p-8 flex items-center justify-center h-28 sm:h-40 md:h-48 lg:h-56 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_20px_rgba(45,212,191,0.3)] transition-shadow duration-300">
                      <img
                        src={logo}
                        alt={`Partner ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow Button: मोबाइल में पैडिंग और साइज कम किया गया */}
            <button
              onClick={nextSlide}
              className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-30 bg-slate-800/80 hover:bg-teal-500 text-teal-400 hover:text-slate-900 p-1.5 sm:p-2 rounded-full border border-teal-500/30 hover:border-teal-400 transition-all duration-300 shadow-md backdrop-blur-sm group"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>

        {/* --- MLM FEATURES CARD SECTION --- */}
        <section className="container mx-auto px-4 sm:px-6 pt-12 pb-16 relative z-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 font-display text-white tracking-tight">
              हमारे सॉफ़्टवेयर{" "}
              <span className="text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">
                की विशेषताएँ
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              आपके डायरेक्ट सेल्स व्यवसाय को प्रबंधित करने के लिए संपूर्ण
              सॉफ़्टवेयर समाधान।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {mlmFeatures.map((feature, index) => (
              <div
                key={index}
                className="glass p-6 sm:p-8 rounded-[24px] border border-teal-500/20 hover:border-teal-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(45,212,191,0.15)] bg-[#0f172a]/60 backdrop-blur-xl flex flex-col items-center text-center group"
              >
                <div className="bg-teal-500/10 p-4 rounded-2xl text-teal-400 mb-5 sm:mb-6 group-hover:bg-teal-400 group-hover:text-slate-900 transition-colors duration-300 shadow-[0_0_15px_rgba(45,212,191,0.1)] group-hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto pt-16 pb-24 sm:pb-32 px-4 sm:px-6 relative z-20">
          <div className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-[#0f172a] border border-teal-500/20 shadow-2xl backdrop-blur-3xl group transition-all duration-500 hover:border-teal-500/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.15),transparent_50%)]"></div>

            <div className="relative z-10 p-6 sm:p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10">
              <div className="w-full lg:w-7/12 text-center lg:text-left relative">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-white relative z-10 leading-tight">
                  Get More Info With Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                    Growth!
                  </span>
                </h2>
                <div className="flex flex-col gap-3 sm:gap-4 relative z-10">
                  <p className="text-slate-400 text-sm sm:text-base font-light italic mt-1 sm:mt-2">
                    "Then access our site for complete insights."
                  </p>
                </div>

                <div className="hidden lg:block absolute -right-32 xl:-right-40 top-[55%] xl:top-[60%] -translate-y-1/2 w-32 xl:w-40 z-0 pointer-events-none">
                  <img
                    src="/arrow.webp"
                    alt="Arrow Direction"
                    className="w-full h-auto opacity-70 invert drop-shadow-[0_0_15px_rgba(45,212,191,0.4)] animate-arrow-flow"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* CTA BUTTON AREA */}
              <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-end relative z-20">
                <a
                  href="https://wa.me/447412812865"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="relative w-full sm:w-auto cursor-pointer group block"
                >
                  <div className="absolute -inset-5 z-0 rounded-[2rem]"></div>
                  {/* Changed <button> to <div> to keep valid HTML inside <a> tag */}
                  <div className="relative z-10 w-full sm:w-auto bg-teal-500 text-white hover:bg-teal-400 px-3 min-[375px]:px-5 md:px-10 py-3 md:py-5 rounded-full flex items-center justify-center gap-2 min-[375px]:gap-3 transition-all transform group-hover:scale-[1.03] active:scale-95 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0"></div>
                    <Fingerprint className="text-xl min-[375px]:text-2xl md:text-3xl w-6 h-6 sm:w-8 sm:h-8 shrink-0 group-hover:-rotate-12 transition-transform relative z-10" />
                    <span className="text-[12px] min-[375px]:text-[14px] md:text-lg font-bold uppercase tracking-wider whitespace-normal sm:whitespace-nowrap relative z-10 leading-tight">
                      Whatsapp Channel
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-teal-500/20 py-6 md:py-8 bg-[#0B1120]/90 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] md:text-xs font-bold text-slate-500 tracking-widest uppercase">
            <a className="hover:text-teal-400 transition-colors" href="#">
              Privacy
            </a>
            <a className="hover:text-teal-400 transition-colors" href="#">
              Terms
            </a>
            <a className="hover:text-teal-400 transition-colors" href="#">
              Contact
            </a>
          </div>
          <p className="text-slate-600 text-[10px] md:text-sm text-center">
            Copyright © 2026 All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Landing;
