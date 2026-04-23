import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "../../atoms/Button/Button";
import { GradientText } from "../../atoms/GradientText/GradientText";
import { Icon } from "../../atoms/Icon/Icon";
import { TypewriterText } from "../../molecules/TypewriterText/TypewriterText";
import { profile } from "../../../data/profile";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >

      {/* Content */}
      <motion.div
        className="max-w-container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-lg mb-2"
        >
          {profile.greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
        >
          <GradientText animated>{profile.name}</GradientText>
        </motion.h1>

        {/* Typewriter — fixed height to prevent layout shift */}
        <motion.div
          variants={itemVariants}
          className="h-10 md:h-12 flex items-center justify-center mb-6"
        >
          <TypewriterText
            titles={profile.titles}
            className="text-xl md:text-2xl font-semibold text-text-secondary"
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {profile.aboutMe}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Button variant="primary" size="lg" href="#contact">
            Get in Touch
          </Button>
          <Button variant="outline" size="lg" href="#experience">
            View Experience
          </Button>
        </motion.div>

        {/* Location badge */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg-elevated/50 backdrop-blur-sm text-text-secondary text-sm">
            <Icon name="MapPin" size={14} className="text-accent-primary" />
            {profile.location}
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <a href="#about" aria-label="Scroll to about section">
          <Icon name="ChevronDown" size={24} className="text-text-secondary" />
        </a>
      </motion.div>
    </section>
  );
}
