"use client";

import { motion } from "motion/react";
import { ArrowRight, Check, Menu, Sparkles } from "lucide-react";
import { SiteSpec } from "@/lib/site-builder/types";

function SectionHeading({
  kicker,
  title,
  copy,
  spec,
}: {
  kicker: string;
  title: string;
  copy: string;
  spec: SiteSpec;
}) {
  return (
    <div className="site-section-heading">
      <span style={{ color: spec.theme.primary }}>{kicker}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

export function LivePreview({ spec }: { spec: SiteSpec }) {
  const themeVars = {
    "--site-bg": spec.theme.background,
    "--site-surface": spec.theme.surface,
    "--site-text": spec.theme.text,
    "--site-muted": spec.theme.muted,
    "--site-primary": spec.theme.primary,
    "--site-accent": spec.theme.accent,
  } as React.CSSProperties;

  return (
    <div
      className={`generated-site effect-${spec.theme.effect}`}
      style={themeVars}
    >
      <nav className="site-nav">
        <div className="site-brand">
          <span className="brand-mark" />
          {spec.name}
        </div>
        <div className="site-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="site-nav-cta">
          Get started <ArrowRight size={14} />
        </button>
        <button className="site-mobile-menu" aria-label="Open menu">
          <Menu size={18} />
        </button>
      </nav>

      <main>
        <section className="site-hero">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="hero-inner"
          >
            <div className="hero-eyebrow">
              <Sparkles size={14} /> {spec.hero.eyebrow}
            </div>
            <h1>{spec.hero.title}</h1>
            <p>{spec.hero.subtitle}</p>
            <div className="hero-actions">
              <button className="primary-cta">
                {spec.hero.primaryCta}
                <ArrowRight size={16} />
              </button>
              <button className="secondary-cta">
                {spec.hero.secondaryCta}
              </button>
            </div>

            <div className="hero-window">
              <div className="window-bar">
                <i />
                <i />
                <i />
                <span>{spec.category} experience</span>
              </div>
              <div className="window-content">
                <div className="window-copy">
                  <small>Designed to feel intentional</small>
                  <strong>{spec.description}</strong>
                  <span>
                    A strong visual system, responsive layout, and subtle
                    interaction are already included.
                  </span>
                </div>
                <div className="window-cards">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {spec.sections.includes("features") && (
          <section className="site-section" id="features">
            <SectionHeading
              kicker="WHY IT WORKS"
              title="Everything has a reason to be here."
              copy="Clear hierarchy, useful content, and a visual language that stays consistent from top to bottom."
              spec={spec}
            />
            <div className="feature-grid">
              {spec.features.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <span className="feature-number">0{index + 1}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {spec.sections.includes("stats") && (
          <section className="stats-row">
            {spec.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </section>
        )}

        {spec.sections.includes("testimonials") && (
          <section className="site-section alt-section">
            <SectionHeading
              kicker="TRUSTED EXPERIENCE"
              title="A first impression that feels finished."
              copy="Social proof is presented with enough restraint to support the story instead of overwhelming it."
              spec={spec}
            />
            <div className="quote-grid">
              {spec.testimonials.map((item) => (
                <blockquote key={item.name}>
                  <p>“{item.quote}”</p>
                  <footer>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {spec.sections.includes("pricing") && (
          <section className="site-section">
            <SectionHeading
              kicker="SIMPLE PRICING"
              title="Choose the pace that fits you."
              copy="A clear pricing section with one obvious recommendation and no unnecessary friction."
              spec={spec}
            />
            <div className="price-grid">
              {spec.pricing.map((plan) => (
                <article
                  key={plan.name}
                  className={plan.popular ? "popular-plan" : ""}
                >
                  {plan.popular && (
                    <span className="popular-badge">Most popular</span>
                  )}
                  <h3>{plan.name}</h3>
                  <strong>
                    {plan.price}
                    <small>/mo</small>
                  </strong>
                  <p>{plan.description}</p>
                  <ul>
                    <li>
                      <Check size={15} /> Responsive pages
                    </li>
                    <li>
                      <Check size={15} /> Prompt-based edits
                    </li>
                    <li>
                      <Check size={15} /> Modern effects
                    </li>
                  </ul>
                  <button>{plan.popular ? "Choose Pro" : "Get started"}</button>
                </article>
              ))}
            </div>
          </section>
        )}

        {spec.sections.includes("faq") && (
          <section className="site-section alt-section">
            <SectionHeading
              kicker="QUESTIONS"
              title="The useful answers, up front."
              copy="Short, direct FAQs make the page easier to trust and easier to act on."
              spec={spec}
            />
            <div className="faq-list">
              {spec.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    {faq.question}
                    <span>+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {spec.sections.includes("contact") && (
          <section className="site-contact" id="contact">
            <div>
              <span>LET’S MAKE SOMETHING GOOD</span>
              <h2>{spec.contact.heading}</h2>
              <p>{spec.contact.copy}</p>
            </div>
            <button>
              {spec.contact.email}
              <ArrowRight size={16} />
            </button>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <strong>{spec.name}</strong>
        <span>Generated with AI Builder System</span>
      </footer>
    </div>
  );
}
