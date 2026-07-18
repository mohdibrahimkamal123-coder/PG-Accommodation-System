import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Categories from '../components/Categories';
import FeaturedListings from '../components/FeaturedListings';
import WhyChooseUs from '../components/WhyChooseUs';
import PopularCities from '../components/PopularCities';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Helper for scroll-triggered reveal animations.
      // FIX: `toggleActions: 'play none none none'` (and `once: true`) means
      // each section animates in ONCE and stays visible — it no longer
      // reverses/fades out when the user scrolls back up past the trigger.
      const revealOnScroll = (selector, fromVars, toVars, trigger, opts = {}) => {
        gsap.fromTo(selector, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
            ...opts.scrollTrigger,
          },
          ease: opts.ease || 'power3.out',
          duration: opts.duration ?? 0.7,
          stagger: opts.stagger,
          delay: opts.delay,
        });
      };

      // 1. Initial Page Load Animations (Hero Section) — unchanged, these
      // aren't scroll-triggered so they were never affected by the bug.
      gsap.fromTo('.hero-badge',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.2 }
      );


      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo('.hero-image-container',
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.5 }
      );

      gsap.fromTo('.search-widget',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );

      // 2. Scroll Triggered Sections

      // Trusted By
      revealOnScroll('.trusted-title', { opacity: 0, y: 20 }, { opacity: 0.5, y: 0 }, '.trusted-section', { duration: 0.6 });
      revealOnScroll('.partner-logo', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '.trusted-section', { duration: 0.5, stagger: 0.1, delay: 0.2 });

      // Categories
      revealOnScroll('.categories-section .section-header-left', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '.categories-section');
      revealOnScroll('.category-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, '.categories-section', { duration: 0.6, stagger: 0.12, delay: 0.2, ease: 'power2.out' });

      // Featured Listings
      revealOnScroll('.featured-listings-section .section-header-left', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '.featured-listings-section');
      revealOnScroll('.property-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, '.featured-listings-section', { stagger: 0.15, delay: 0.2 });

      // Why Choose Us
      revealOnScroll('.why-us-section .section-tag, .why-us-section h2, .why-us-section p', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '.why-us-section', { stagger: 0.08 });
      revealOnScroll('.feature-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, '.why-us-section', { duration: 0.6, stagger: 0.15, delay: 0.2 });

      // Popular Cities
      revealOnScroll('.cities-section .section-header-left', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '.cities-section');
      revealOnScroll('.city-card', { opacity: 0, scale: 0.95, y: 30 }, { opacity: 1, scale: 1, y: 0 }, '.cities-section', { duration: 0.6, stagger: 0.12, delay: 0.2 });

      // Testimonials
      revealOnScroll('.testimonials-section .section-tag, .testimonials-section h2, .testimonials-section p', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '.testimonials-section', { stagger: 0.08 });
      revealOnScroll('.testimonial-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, '.testimonials-section', { duration: 0.6, stagger: 0.15, delay: 0.2 });

      // FAQ
      revealOnScroll('.faq-left', { opacity: 0, x: -40 }, { opacity: 1, x: 0 }, '.faq-section');
      revealOnScroll('.faq-item', { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, '.faq-section', { duration: 0.5, stagger: 0.12, delay: 0.2, ease: 'power2.out' });

      // CTA
      revealOnScroll('.cta-banner-card', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1 }, '.cta-banner-section', { duration: 1 });

    });

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      ctx.revert();
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Hero />
      <TrustedBy />
      <Categories />
      <FeaturedListings />
      <WhyChooseUs />
      <PopularCities />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
};

export default Home;