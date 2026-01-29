import { motion } from "framer-motion";
import { Zap, Wallet, Users, Brush, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Create Invoices in Seconds",
    description:
      "Professional templates, auto-calculations, and smart defaults mean less time on paperwork and more time on your business.",
  },
  {
    icon: Wallet,
    title: "Track Payments Effortlessly",
    description:
      "Real-time payment status, automatic reminders, and instant notifications keep you in the loop on every transaction.",
  },
  {
    icon: Users,
    title: "Manage Your Clients",
    description:
      "Store client details, track project history, and manage relationships all in one organized place.",
  },
  {
    icon: Brush,
    title: "Beautiful & Professional",
    description:
      "Customizable templates that make your business look polished and credible. Add your logo, colors, and branding.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Bank-level encryption, automatic backups, and 99.9% uptime guarantee. Your data is safe with us.",
  },
  {
    icon: Smartphone,
    title: "Work From Anywhere",
    description:
      "Create and send invoices from your phone, tablet, or desktop. Fully responsive design works everywhere.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Everything You Need to Get Paid
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, powerful tools to create invoices, track payments, and manage your 
            business finances.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="feature-icon mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
