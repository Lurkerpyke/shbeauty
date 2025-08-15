'use client';

import React, { useEffect, useRef } from 'react';
import { Montserrat, Cormorant_SC } from 'next/font/google';
import gsap from 'gsap';
import Image from 'next/image';

/**
 * OurHistory — a full rewrite focused on typography, UX, performance and accessibility.
 *
 * Notes:
 * - Replace placeholder images (srcs) with optimized WebP images in production.
 * - Tailwind utility classes are used as in your original file; I add minimal inline/global styles
 *   for the fluid type scale and focus/contrast tokens.
 */

// Fonts (variable) — display: 'swap' for fast text rendering
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-montserrat',
    display: 'swap',
});
const cormorantSC = Cormorant_SC({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-cormorant-sc',
    display: 'swap',
});

export default function OurHistory() {
    // refs
    const heroRef = useRef<HTMLElement | null>(null);
    const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
    const heroSubtitleRef = useRef<HTMLParagraphElement | null>(null);
    const heroBgRef = useRef<HTMLDivElement | null>(null);
    const scrollDotRef = useRef<HTMLDivElement | null>(null);

    const timelineRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);

    const teamRef = useRef<HTMLElement | null>(null);
    const ctaRef = useRef<HTMLElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        let ctx: gsap.Context | null = null;
        let scrollTriggerInstance: any = null;

        // Keep track of event listeners so we can remove them on cleanup (no leaks, console-free)
        const listeners: Array<{ el: Element; type: string; handler: EventListener }> = [];

        (async () => {
            // dynamic import of ScrollTrigger — avoids SSR issues & render-blocking
            try {
                const ss = await import('gsap/ScrollTrigger');
                const ScrollTrigger = ss.ScrollTrigger || ss.default;
                gsap.registerPlugin(ScrollTrigger);
                scrollTriggerInstance = ScrollTrigger;
            } catch (err) {
                // If ScrollTrigger fails to load, we gracefully skip scroll-driven animations.
                // Progressive enhancement: page still fully usable.
                // eslint-disable-next-line no-console
                console.warn('ScrollTrigger failed to load — scroll animations disabled.', err);
            }

            // Respect reduced motion
            const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) return;

            ctx = gsap.context(() => {
                // ---------- HERO TIMELINE ----------
                const titleWords = heroTitleRef.current?.querySelectorAll('span') ?? [];
                const subtitleEl = heroSubtitleRef.current;
                const heroBgEl = heroBgRef.current;
                const scrollDot = scrollDotRef.current;

                // Entrance timeline for hero
                const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
                if (titleWords.length) {
                    heroTl.fromTo(
                        titleWords,
                        { y: 48, opacity: 0, rotationX: -8 },
                        { y: 0, opacity: 1, rotationX: 0, stagger: 0.09, duration: 1.0 }
                    );
                }

                if (subtitleEl) {
                    heroTl.fromTo(subtitleEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');
                }

                if (scrollDot) {
                    heroTl.fromTo(scrollDot, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3');
                    gsap.to(scrollDot, { y: 10, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                }

                // subtle parallax on hero background (only if ScrollTrigger loaded)
                if (heroBgEl && scrollTriggerInstance) {
                    gsap.to(heroBgEl, {
                        yPercent: -10,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: heroRef.current,
                            start: 'top top',
                            end: 'bottom top',
                            scrub: true,
                        },
                    });
                }

                // ---------- TIMELINE PATH ----------
                const timelineContainer = timelineRef.current;
                if (timelineContainer && svgRef.current && pathRef.current) {
                    const svg = svgRef.current;
                    const path = pathRef.current;

                    // Compute container height (guarded) and set viewBox only on client to avoid SSR mismatch
                    const computedHeight = Math.max(timelineContainer.offsetHeight || 0, window.innerHeight || 800) + 200;
                    svg.setAttribute('viewBox', `0 0 100 ${computedHeight}`);
                    path.setAttribute('d', `M50 0 L50 ${computedHeight}`);

                    // stroke dash animation
                    // guard getTotalLength in case of weird browser behavior
                    try {
                        const pathLength = path.getTotalLength();
                        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
                        if (scrollTriggerInstance) {
                            gsap.to(path, {
                                strokeDashoffset: 0,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: timelineContainer,
                                    start: 'top+=120 top',
                                    end: 'bottom top',
                                    scrub: 0.8,
                                },
                            });
                        } else {
                            // fallback animation (entrance)
                            gsap.to(path, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out', delay: 0.6 });
                        }
                    } catch {
                        // ignore if getTotalLength fails in an older browser; progressive enhancement
                    }
                }

                // ---------- TIMELINE ITEMS ----------
                const items = Array.from(timelineContainer?.querySelectorAll<HTMLElement>('.timeline-item') ?? []);
                items.forEach((item) => {
                    const content = item.querySelector<HTMLElement>('.timeline-content');
                    const iconWrap = item.querySelector<HTMLElement>('.timeline-icon');
                    const imgWrap = item.querySelector<HTMLElement>('.timeline-image');

                    // detect side from data-side or class
                    const isLeft = item.dataset.side === 'left' || item.classList.contains('timeline-left');

                    if (content) {
                        gsap.from(content, {
                            x: isLeft ? -64 : 64,
                            opacity: 0,
                            duration: 0.9,
                            ease: 'power3.out',
                            scrollTrigger: scrollTriggerInstance
                                ? { trigger: item, start: 'top 66%', toggleActions: 'play none none none' }
                                : undefined,
                        });
                    }

                    if (iconWrap) {
                        gsap.from(iconWrap, {
                            scale: 0,
                            rotation: -20,
                            duration: 0.7,
                            ease: 'back.out(1.6)',
                            scrollTrigger: scrollTriggerInstance
                                ? { trigger: item, start: 'top 66%', toggleActions: 'play none none none' }
                                : undefined,
                        });
                    }

                    if (imgWrap) {
                        gsap.from(imgWrap, {
                            scale: 1.04,
                            opacity: 0,
                            duration: 1.0,
                            ease: 'power3.out',
                            scrollTrigger: scrollTriggerInstance
                                ? { trigger: item, start: 'top 88%', toggleActions: 'play none none none' }
                                : undefined,
                        });
                    }
                });

                // ---------- TEAM CARDS ----------
                const teamCards = Array.from(teamRef.current?.querySelectorAll<HTMLElement>('.team-card') ?? []);
                if (teamCards.length) {
                    gsap.from(teamCards, {
                        y: 20,
                        opacity: 0,
                        stagger: 0.12,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: scrollTriggerInstance
                            ? { trigger: teamRef.current, start: 'top 85%' }
                            : undefined,
                    });

                    // attach hover interactions but also keyboard focus interactions (accessibility)
                    teamCards.forEach((card) => {
                        const img = card.querySelector<HTMLElement>('.team-img') ?? card.querySelector<HTMLElement>('img');
                        const overlay = card.querySelector<HTMLElement>('.team-overlay');

                        // handlers
                        const enter = () => {
                            if (img) gsap.to(img, { scale: 1.06, duration: 0.45, ease: 'power2.out' });
                            if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
                        };
                        const leave = () => {
                            if (img) gsap.to(img, { scale: 1, duration: 0.45, ease: 'power2.out' });
                            if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.out' });
                        };

                        // mouse
                        card.addEventListener('mouseenter', enter);
                        card.addEventListener('mouseleave', leave);

                        // keyboard (focus)
                        card.addEventListener('focusin', enter);
                        card.addEventListener('focusout', leave);

                        listeners.push({ el: card, type: 'mouseenter', handler: enter });
                        listeners.push({ el: card, type: 'mouseleave', handler: leave });
                        listeners.push({ el: card, type: 'focusin', handler: enter });
                        listeners.push({ el: card, type: 'focusout', handler: leave });
                    });
                }

                // ---------- CTA BUTTON micro hover ----------
                if (btnRef.current) {
                    const btn = btnRef.current;
                    const enter = () => gsap.to(btn, { scale: 1.03, boxShadow: '0px 18px 40px rgba(0,0,0,0.12)', duration: 0.22 });
                    const leave = () => gsap.to(btn, { scale: 1, boxShadow: '0px 8px 18px rgba(0,0,0,0.06)', duration: 0.22 });

                    btn.addEventListener('mouseenter', enter);
                    btn.addEventListener('mouseleave', leave);
                    btn.addEventListener('focus', enter);
                    btn.addEventListener('blur', leave);

                    listeners.push({ el: btn, type: 'mouseenter', handler: enter });
                    listeners.push({ el: btn, type: 'mouseleave', handler: leave });
                    listeners.push({ el: btn, type: 'focus', handler: enter });
                    listeners.push({ el: btn, type: 'blur', handler: leave });
                }
            }, heroRef); // scope

        })();

        // cleanup
        return () => {
            try {
                // remove event listeners we added
                listeners.forEach(({ el, type, handler }) => el.removeEventListener(type, handler));
                // revert gsap context animations & ScrollTriggers
                if (ctx) ctx.revert();
                const ST = (gsap as any).globals?.ScrollTrigger || (window as any).ScrollTrigger;
                if (ST?.getAll) ST.getAll().forEach((t: any) => t.kill && t.kill());
            } catch (err) {
                // don't throw from cleanup
                // eslint-disable-next-line no-console
                console.warn('Cleanup warning', err);
            }
        };
    }, []);

    // Accessible skip link for keyboard users
    // Inline critical CSS & CSS variables for fluid type scale and tokens
    return (
        <>
            <style jsx global>{`
        /* Critical/inline tokens (kept minimal) */

          /* fonts (variables added via next/font) */
          --font-heading: var(--font-cormorant-sc, serif);
          --font-body: var(--font-montserrat, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial);

          /* modular scale (ratio: 1.414) — fluid with clamp */
          --step--2: clamp(0.64rem, calc(0.55rem + 0.35vw), 0.7rem);
          --step--1: clamp(0.8rem, calc(0.72rem + 0.4vw), 0.9rem);
          --step-0: clamp(1rem, calc(0.96rem + 0.45vw), 1.125rem);
          --step-1: clamp(1.414rem, calc(1.34rem + 0.6vw), 1.6rem);
          --step-2: clamp(2rem, calc(1.9rem + 0.9vw), 2.56rem);
          --step-3: clamp(2.828rem, calc(2.66rem + 1.4vw), 3.6rem);
          --step-4: clamp(4rem, calc(3.7rem + 2.6vw), 5.2rem);

          /* rhythm and leading */
          --leading-tight: 1.2;
          --leading-read: 1.6;
        }

        html, body, #__next {
          height: 100%;
          background: var(--bg);
          color: var(--fg);
        }

        /* fonts */
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-heading);
          color: var(--fg);
          line-height: var(--leading-tight);
          margin: 0;
        }
        body, p, li, input, button {
          font-family: var(--font-body);
          line-height: var(--leading-read);
        }

        /* Focus states — visible and high contrast */
        :focus {
          outline: 3px solid #ffd54f;
          outline-offset: 3px;
        }

        /* Skip link */
        .skip-link {
          position: absolute;
          left: -9999px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
        .skip-link:focus {
          left: 1rem;
          top: 1rem;
          width: auto;
          height: auto;
          padding: 0.5rem 1rem;
          background: var(--fg);
          color: var(--bg);
          z-index: 9999;
          border-radius: 4px;
        }

        /* Prevent layout shifts for images using aspect-ratio and explicit object-fit handled in markup */
        .aspect-video { aspect-ratio: 16 / 9; }
        .aspect-square { aspect-ratio: 1 / 1; }
        .aspect-4-5 { aspect-ratio: 4 / 5; }

        /* Reduce motion: if user prefers reduced motion, disable animated transforms used by GSAP */
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }

        /* Small utility tweaks for contrast when using tailwind variables like bg-background/text-foreground */
        .bg-foreground { background-color: var(--fg); color: var(--bg); }
        .text-foreground { color: var(--fg); }
      `}</style>

            <div className={`min-h-screen ${cormorantSC.variable} ${montserrat.variable}`} aria-labelledby="page-title">
                <a className="skip-link" href="#main-content">
                    Skip to content
                </a>

                {/* HERO */}
                <header
                    ref={heroRef}
                    className="relative h-[100dvh] flex flex-col justify-center items-center overflow-hidden"
                    role="banner"
                >
                    {/* Decorative background — marked aria-hidden */}
                    <div className="absolute inset-0 z-0" aria-hidden="true">
                        <div
                            ref={heroBgRef}
                            className="absolute inset-0 w-full h-full"
                            style={{
                                background:
                                    'linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(255,255,255,0.02) 60%), linear-gradient(135deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))',
                            }}
                        />
                    </div>

                    <div className="relative z-10 text-center px-6">
                        <h1
                            id="page-title"
                            ref={heroTitleRef}
                            className={`uppercase tracking-[0.32em] text-4xl lg:text-9xl font-bold leading-tight ${cormorantSC.className}`}
                        >
                            <span className="block" aria-hidden="true">
                                Nossa
                            </span>
                            <span className="block" aria-hidden="true">
                                História
                            </span>
                            {/* Hidden text for screen readers—clear page context */}
                            <span className="sr-only">Nossa História — a decade of perfecting the art of brows</span>
                        </h1>

                        <p
                            ref={heroSubtitleRef}
                            className="mt-6 max-w-2xl mx-auto text-[var(--step-0)] leading-[1.6] opacity-90"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Uma década aperfeiçoando a arte das sobrancelhas e celebrando a beleza natural
                        </p>
                    </div>

                    {/* scroll indicator — visible to sighted users only; aria-hidden for screen readers */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2" aria-hidden="true">
                        <div
                            className="w-9 h-12 rounded-full border border-[rgb(255,255,255)] flex justify-center items-start p-2"
                            style={{ background: 'transparent' }}
                        >
                            <div
                                ref={scrollDotRef}
                                className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.98)]"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </header>

                <main id="main-content" role="main">
                    {/* TIMELINE */}
                    <section
                        ref={timelineRef}
                        aria-labelledby="timeline-title"
                        className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative"
                    >
                        <div className="text-center mb-12">
                            <h2 id="timeline-title" className="uppercase text-[var(--step-2)] font-light tracking-[0.18em]">
                                Moldando a Beleza Através do Tempo
                            </h2>
                            <div className="w-24 h-px bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.12),transparent)] mx-auto mt-4" />
                        </div>

                        {/* Animated vertical svg line — aria-hidden */}
                        <svg
                            ref={svgRef}
                            className="absolute left-1/2 -translate-x-1/2 h-full w-6 pointer-events-none"
                            aria-hidden="true"
                        >
                            <path
                                ref={pathRef}
                                d="M50 0 L50 1000"
                                strokeWidth={1}
                                stroke="url(#gradient)"
                                strokeLinecap="round"
                                fill="none"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="30%" stopColor="rgba(0,0,0,0.08)" />
                                    <stop offset="70%" stopColor="rgba(0,0,0,0.08)" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="space-y-20 md:space-y-28">
                            {/* TIMELINE ITEM 1 */}
                            <article className="timeline-item relative grid md:grid-cols-12 gap-8 items-center" data-side="left">
                                <div className="md:col-span-5 md:col-start-1 flex flex-col items-end text-right timeline-content">
                                    <div className="mb-2">
                                        <time className={`${montserrat.className} text-xs font-semibold tracking-[0.28em] uppercase`} dateTime="2012">
                                            2012
                                        </time>
                                    </div>
                                    <h3 className="text-[var(--step-1)] font-normal mb-3 leading-tight">O Primeiro Estúdio</h3>
                                    <p className={`${montserrat.className} text-[var(--step-0)] max-w-md opacity-90`}>
                                        Nossa fundadora abriu um pequeno estúdio com a visão de transformar a arte das sobrancelhas. Começando com apenas duas cadeiras, ela foi pioneira no movimento das sobrancelhas naturais.
                                    </p>
                                </div>

                                <div className="md:col-span-2 md:col-start-6 flex justify-center">
                                    <div
                                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center timeline-icon"
                                        aria-hidden="true"
                                    >
                                        <div className="absolute inset-0 rounded-full border border-[rgba(0,0,0,0.06)]" />
                                        <div className="text-3xl md:text-4xl" aria-hidden="true">
                                            ✧
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-5 md:col-start-7 timeline-image">
                                    <figure className="relative w-full aspect-video rounded-sm overflow-hidden border border-[rgba(0,0,0,0.06)]">
                                        <Image
                                            src="/placeholder.svg"
                                            alt="Opening of the first studio in 2012"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            style={{ objectFit: 'cover' }}
                                            priority
                                        // Use WebP optimized in production. Keep priority to help LCP for hero-proximate content.
                                        />
                                    </figure>
                                </div>
                            </article>

                            {/* TIMELINE ITEM 2 */}
                            <article className="timeline-item relative grid md:grid-cols-12 gap-8 items-center" data-side="right">
                                <div className="md:col-span-5 md:col-start-7 flex flex-col items-start timeline-content">
                                    <div className="mb-2">
                                        <time className={`${montserrat.className} text-xs font-semibold tracking-[0.28em] uppercase`} dateTime="2016">
                                            2016
                                        </time>
                                    </div>
                                    <h3 className="text-[var(--step-1)] font-normal mb-3 leading-tight">Signature Technique</h3>
                                    <p className={`${montserrat.className} text-[var(--step-0)] max-w-md opacity-90`}>
                                        Após anos de pesquisa, desenvolvemos nossa técnica exclusiva "Feather & Flow". Essa abordagem inovadora nos rendeu o Prêmio Nacional de Inovação em Beleza.
                                    </p>
                                </div>

                                <div className="md:col-span-2 md:col-start-6 flex justify-center">
                                    <div
                                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center timeline-icon"
                                        aria-hidden="true"
                                    >
                                        <div className="absolute inset-0 rounded-full border border-[rgba(0,0,0,0.06)]" />
                                        <div className="text-3xl md:text-4xl" aria-hidden="true">
                                            ✦
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-5 md:col-start-1 order-first md:order-none timeline-image">
                                    <figure className="relative w-full aspect-video rounded-sm overflow-hidden border border-[rgba(0,0,0,0.06)]">
                                        <Image
                                            src="/placeholder.svg"
                                            alt="Training and early technique workshops"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            style={{ objectFit: 'cover' }}
                                            loading="lazy"
                                        />
                                    </figure>
                                </div>
                            </article>

                            {/* TIMELINE ITEM 3 */}
                            <article className="timeline-item relative grid md:grid-cols-12 gap-8 items-center" data-side="left">
                                <div className="md:col-span-5 md:col-start-1 flex flex-col items-end text-right timeline-content">
                                    <div className="mb-2">
                                        <time className={`${montserrat.className} text-xs font-semibold tracking-[0.28em] uppercase`} dateTime="2020">
                                            2020
                                        </time>
                                    </div>
                                    <h3 className="text-[var(--step-1)] font-normal mb-3 leading-tight">Reconhecimento Global</h3>
                                    <p className={`${montserrat.className} text-[var(--step-0)] max-w-md opacity-90`}>
                                        Nosso trabalho foi destaque na Vogue Beauty e na Harper Bazaar. Passamos a treinar artistas no mundo inteiro, criando nossa academia para compartilhar nossa filosofia.
                                    </p>
                                </div>

                                <div className="md:col-span-2 md:col-start-6 flex justify-center">
                                    <div
                                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center timeline-icon"
                                        aria-hidden="true"
                                    >
                                        <div className="absolute inset-0 rounded-full border border-[rgba(0,0,0,0.06)]" />
                                        <div className="text-3xl md:text-4xl" aria-hidden="true">
                                            ✶
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-5 md:col-start-7 timeline-image">
                                    <figure className="relative w-full aspect-video rounded-sm overflow-hidden border border-[rgba(0,0,0,0.06)]">
                                        <Image
                                            src="/placeholder.svg"
                                            alt="Feature in fashion publications"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            style={{ objectFit: 'cover' }}
                                            loading="lazy"
                                        />
                                    </figure>
                                </div>
                            </article>
                        </div>
                    </section>

                    {/* PHILOSOPHY */}
                    <section className="py-20">
                        <div className="max-w-7xl mx-auto px-4 md:px-8">
                            <div className="grid md:grid-cols-12 gap-12 items-center">
                                <div className="md:col-span-6">
                                    <figure className="relative w-full aspect-4-5 rounded-sm overflow-hidden border border-[rgba(0,0,0,0.06)]">
                                        <Image
                                            src="/placeholder.svg"
                                            alt="Our Philosophy image: natural brows"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width:768px) 100vw, 50vw"
                                            loading="lazy"
                                        />
                                    </figure>
                                </div>

                                <div className="md:col-span-6">
                                    <div className="mb-8">
                                        <h2 className="text-[var(--step-3)] font-light mb-3">Nossa Filosofia</h2>
                                        <div className="w-32 h-px bg-[rgba(0,0,0,0.08)]" />
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-px bg-[rgba(0,0,0,0.18)]" />
                                                <h3 className={`${montserrat.className} uppercase text-sm font-semibold`}>Realce Natural</h3>
                                            </div>
                                            <p className={`${montserrat.className} text-[var(--step-0)] opacity-90`}>
                                                Acreditamos em realçar suas características naturais em vez de criar formas artificiais. Cada design de sobrancelha é meticulosamente elaborado para complementar sua estrutura facial única.
                                            </p>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-px bg-[rgba(0,0,0,0.18)]" />
                                                <h3 className={`${montserrat.className} uppercase text-sm font-semibold`}>Precisão & Arte</h3>
                                            </div>
                                            <p className={`${montserrat.className} text-[var(--step-0)] opacity-90`}>
                                                Cada traço é intencional. Nossos artistas treinam por mais de 500 horas para dominar o delicado equilíbrio entre simetria, proporção e expressão pessoal.
                                            </p>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-px bg-[rgba(0,0,0,0.18)]" />
                                                <h3 className={`${montserrat.className} uppercase text-sm font-semibold`}>Beleza Sustentável</h3>
                                            </div>
                                            <p className={`${montserrat.className} text-[var(--step-0)] opacity-90`}>
                                                Estamos comprometidos com práticas ecológicas, desde nossos produtos livres de crueldade até nossas iniciativas de redução de resíduos. A beleza deve honrar tanto as pessoas quanto o planeta.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* TEAM */}
                    <section ref={teamRef} className="py-20 px-4 md:px-8 max-w-7xl mx-auto" aria-labelledby="team-title">
                        <div className="text-center mb-10">
                            <h2 id="team-title" className="text-[var(--step-2)] font-light uppercase tracking-[0.18em]">Os Artistas por Trás das Sobrancelhas</h2>
                            <p className={`${montserrat.className} text-[var(--step-0)] max-w-2xl mx-auto mt-3`} >Nossa equipe de artistas de sobrancelhas certificados reúne décadas de experiência e uma paixão compartilhada pela perfeição</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((n) => (
                                <article
                                    key={n}
                                    className="group team-card focus:outline-none"
                                    tabIndex={0}
                                    aria-labelledby={`team-${n}-name`}
                                    role="article"
                                >
                                    <div className="relative overflow-hidden mb-4 aspect-square rounded-sm">
                                        <div className="w-full h-full team-img">
                                            <Image
                                                src="/placeholder.svg"
                                                alt={`Artist ${n}`}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 640px) 100vw, 33vw"
                                                loading={n === 1 ? 'eager' : 'lazy'} // first card eager to help perceived performance
                                            />
                                        </div>

                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end items-center p-4 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 team-overlay"
                                            aria-hidden="true"
                                        >
                                            <p className={`${montserrat.className} text-center text-sm text-white mb-3`}>
                                                Artista Mestre Certificada com 8 anos de experiência, especializada em microblading e laminação de sobrancelhas
                                            </p>
                                            <div className="flex gap-3">
                                                <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-xs">IG</a>
                                                <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-xs">IN</a>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 id={`team-${n}-name`} className="text-lg font-normal mb-1">Elena Rossi</h3>
                                    <p className={`${montserrat.className} text-xs tracking-[0.18em] uppercase`}>Fundadora & Diretora Criativa</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <section ref={ctaRef} className="py-20">
                        <div className="max-w-4xl mx-auto px-4 text-center">
                            <h2 className="text-[var(--step-3)] font-light mb-6">
                                <span className="block text-xl">Seja Parte</span>
                                <span className="block mb-6 text-xl">Da Nossa História</span>
                            </h2>
                            <p className={`${montserrat.className} text-[var(--step-0)] max-w-2xl mx-auto mb-8`}>
                                Experimente a diferença da arte criada ao longo de uma década. Agende sua transformação de sobrancelhas sob medida hoje.
                            </p>

                            <button
                                ref={btnRef}
                                type="button"
                                className={`${montserrat.className} relative inline-flex items-center justify-center px-8 py-4 uppercase tracking-[0.28em] text-sm font-medium rounded-md`}
                                aria-label="Book consultation"
                                style={{
                                    background: 'var(--fg)',
                                    color: 'var(--bg)',
                                    minWidth: '240px',
                                    boxShadow: '0px 8px 18px rgba(0,0,0,0.06)',
                                }}
                            >
                                <span style={{ position: 'relative', zIndex: 2 }}>Agendar Consulta</span>
                                {/* decorative overlay (non-interactive) */}
                                <span aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.06, background: 'linear-gradient(90deg, transparent, #ffffff)' }} />
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
