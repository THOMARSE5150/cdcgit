import { Link } from "wouter";
import { ArrowRight, ChevronDown, ArrowDownCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import heroCanvaImageWebp from "../../assets/images/hero_image_canva_optimized.webp";
import { useMicroInteractions, getMicroInteractionClasses, getMicroInteractionProps } from "@/hooks/useMicroInteractions";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const [isScrolled, setIsScrolled] = useState(false);
  const [primaryButtonState, primaryButtonHandlers] = useMicroInteractions({ enableHaptics: true });
  const [secondaryButtonState, secondaryButtonHandlers] = useMicroInteractions();
  const [scrollIndicatorState, scrollIndicatorHandlers] = useMicroInteractions();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[100svh] flex items-center justify-center w-full max-w-full overflow-x-hidden bg-gradient-radial from-[#50c2b9]/10 via-background to-background"
    >
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-1/5 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[#50c2b9]/10 blur-3xl opacity-70 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-[#50c2b9]/8 blur-3xl opacity-60 animate-float" />
        <div className="absolute top-1/3 right-1/5 w-[25vw] h-[25vw] rounded-full bg-[#50c2b9]/5 blur-3xl opacity-40 animate-float" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2320b2aa\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-glass rounded-tr-[100px] backdrop-blur-sm opacity-10 transform rotate-15 -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-glass rounded-bl-[120px] backdrop-blur-sm opacity-10 transform -rotate-15 translate-x-1/4 -translate-y-1/4"></div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10 pt-24 pb-16 md:py-24 lg:py-28 box-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full min-w-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 text-center lg:text-left min-w-0 w-full"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center mb-8 glass-effect px-5 py-2.5 text-primary rounded-full text-sm font-medium relative overflow-hidden group mx-auto lg:mx-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer-slow"></div>
              <span className="relative z-10">Accredited Mental Health Social Worker</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.15] mb-8 tracking-tight"
            >
              <span className="inline-block relative text-balance">
                Creating 
                <span className="absolute w-full h-1.5 bg-primary/20 -bottom-1 left-0 rounded-full"></span>
              </span>{" "}
              <span className="inline-block relative text-balance">
                positive 
                <span className="absolute w-full h-1.5 bg-primary/20 -bottom-1 left-0 rounded-full"></span>
              </span>{" "}
              <span className="inline-block text-balance">change through</span>{" "}
              <span className="inline-block">compassionate counselling</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg text-text-secondary max-w-2xl mb-10 mx-auto lg:mx-0"
            >
              Non-judgmental and compassionate attunement style of counselling to help you achieve and experience your therapy goals.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col gap-4 justify-center lg:justify-start"
            >
              <Link 
                href="/services"
                className={getMicroInteractionClasses(
                  primaryButtonState,
                  "group relative overflow-hidden bg-primary hover:bg-primary-dark text-white px-7 py-4 rounded-2xl transition-all duration-300 text-center shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/25 flex items-center justify-center w-full max-w-md mx-auto lg:mx-0 micro-button micro-lift micro-glow micro-shimmer",
                  { hover: "micro-scale", active: "micro-click" }
                )}
                {...getMicroInteractionProps(primaryButtonHandlers)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 text-base md:text-lg font-medium">Enquire About Counselling With Celia</span>
                <ArrowRight className="relative z-10 ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
                <Link href="/meet-celia" className={getMicroInteractionClasses(secondaryButtonState, "group glass-effect border-transparent hover:border-primary/20 text-text-primary hover:text-primary px-6 py-3.5 rounded-xl transition-all duration-300 text-center font-medium flex items-center justify-center w-full shadow-sm hover:shadow-md micro-lift micro-ripple", { hover: "micro-scale", active: "micro-click" })} {...getMicroInteractionProps(secondaryButtonHandlers)}>
                  <span className="text-base">Meet Celia</span>
                </Link>
                <Link href="/services" className={getMicroInteractionClasses(secondaryButtonState, "group glass-effect border-transparent hover:border-primary/20 text-text-primary hover:text-primary px-6 py-3.5 rounded-xl transition-all duration-300 text-center font-medium flex items-center justify-center w-full shadow-sm hover:shadow-md micro-lift micro-ripple", { hover: "micro-scale", active: "micro-click" })} {...getMicroInteractionProps(secondaryButtonHandlers)}>
                  <span className="text-base">How I Can Help</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 w-full max-w-lg mx-auto lg:mx-0 lg:max-w-full min-w-0"
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden glass-effect shadow-xl shadow-primary/10 relative z-10 p-2">
                <div className="overflow-hidden rounded-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#50c2b9]/30 to-[#50c2b9]/10 z-10 pointer-events-none"></div>
                  <picture className="relative">
                    <source srcSet={heroCanvaImageWebp} type="image/webp" />
                    <img 
                      src={heroCanvaImageWebp} 
                      alt="Compassionate counselling - hands reaching out" 
                      className="w-full h-auto object-cover transform hover:scale-[1.03] transition-transform duration-700" 
                      width={1200}
                      height={800}
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-[#50c2b9] mix-blend-soft-light opacity-40 pointer-events-none"></div>
                  </picture>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? 15 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
      >
        <div 
          className={getMicroInteractionClasses(scrollIndicatorState, "flex flex-col items-center micro-hover micro-pulse", { hover: "micro-scale", active: "micro-click" })}
          onMouseEnter={scrollIndicatorHandlers.onHover}
          onMouseLeave={scrollIndicatorHandlers.onLeave}
          onMouseDown={scrollIndicatorHandlers.onActive}
          onMouseUp={scrollIndicatorHandlers.onInactive}
          onClick={(e) => {
            scrollToNext();
            scrollIndicatorHandlers.onRipple(e);
          }}
        >
          <span className="text-text-secondary text-sm mb-2 font-medium">Discover More</span>
          <div className="p-2 glass-effect rounded-full shadow-md hover:shadow-lg transition-all duration-300 micro-glow">
            <ArrowDownCircle className="h-6 w-6 text-primary animate-bounce-slow" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}