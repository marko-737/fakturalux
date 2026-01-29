import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import laptopMockup from "@/assets/laptop-invoice-mockup.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
      
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
              Invoice Your Clients in{" "}
              <span className="text-gradient">Minutes</span>, Not Hours
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Create professional invoices, track payments, and manage your business—all in one 
              place. Simple invoicing for modern businesses.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button className="btn-primary text-base">
                Join Waitlist
              </Button>
              <Button variant="outline" className="btn-outline text-base">
                Learn More
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground">
                  JD
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center text-xs font-bold text-white">
                  SM
                </div>
                <div className="w-10 h-10 rounded-full bg-cyan-500 border-2 border-background flex items-center justify-center text-xs font-bold text-white">
                  AK
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-bold text-secondary-foreground">
                  +99
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Join hundreds of businesses getting paid faster
              </p>
            </div>
          </motion.div>

          {/* Right content - Laptop mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10 animate-float">
              <img
                src={laptopMockup}
                alt="Invoice management dashboard on laptop"
                className="w-full max-w-2xl mx-auto drop-shadow-2xl"
              />
            </div>
            {/* Decorative glow behind laptop */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-emerald-500/10 to-cyan-500/20 blur-3xl scale-110 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
