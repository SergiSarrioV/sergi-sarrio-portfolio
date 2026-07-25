"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, FileText } from "lucide-react";
import { profile, social } from "@/data/portfolio";
import { GradientWords, Typewriter } from "@/components/AnimatedText";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-20 pt-32"
    >
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
        {profile.availableForWork && (
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for work
            </span>
          </motion.div>
        )}

        <motion.p variants={item} className="mb-3 font-mono text-sm text-accent-cyan">
          {"// hi, my name is"}
        </motion.p>

        {/* Name — reveals word-by-word, with a soft glow behind it */}
        <div className="relative">
          <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 bg-accent-violet/20 blur-3xl" />
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            <GradientWords text={profile.name} />
          </h1>
        </div>

        {/* Rotating role with typewriter effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-4 flex h-10 items-center text-2xl font-semibold text-gray-300 sm:text-4xl"
        >
          <span className="mr-2 text-gray-500">{">"}</span>
          <Typewriter words={profile.roles} className="text-gradient" />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-6 py-3 font-medium text-white transition-all hover:shadow-[0_0_36px_-4px_rgba(124,92,255,0.85)]"
          >
            View my work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800/50 px-6 py-3 font-medium text-gray-200 transition-all hover:border-accent-violet/50 hover:text-white"
          >
            <FileText className="h-4 w-4" />
            Download CV
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex items-center gap-5">
          {social.github && (
            <SocialIcon href={social.github} label="GitHub">
              <Github className="h-5 w-5" />
            </SocialIcon>
          )}
          {social.linkedin && (
            <SocialIcon href={social.linkedin} label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </SocialIcon>
          )}
          {social.email && (
            <SocialIcon href={`mailto:${social.email}`} label="Email">
              <Mail className="h-5 w-5" />
            </SocialIcon>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-ink-600 p-1.5">
          <motion.div
            className="h-2 w-1 rounded-full bg-accent-violet"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-500 transition-colors hover:text-accent-cyan"
    >
      {children}
    </a>
  );
}
