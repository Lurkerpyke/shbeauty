'use client';
import React, { useEffect, useRef } from 'react';
import { Montserrat, Cormorant_SC } from 'next/font/google';
import gsap from 'gsap';

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
});

export default function OurHistory() {
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
        // Dynamic import of ScrollTrigger (client-only)
        let ctx: gsap.Context | null = null;
        let ScrollTrigger: any;
        (async () => {
            const ss = await import('gsap/ScrollTrigger');
            ScrollTrigger = ss.ScrollTrigger || ss.default;
            gsap.registerPlugin(ScrollTrigger);

            // Respect prefers-reduced-motion
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (reduce) return;

            // utility to split text into spans (letters)
            function splitToChars(el: HTMLElement) {
                const text = el.textContent || '';
                el.innerHTML = ''; // clear
                const frag = document.createDocumentFragment();
                for (let char of text) {
                    const span = document.createElement('span');
                    span.className = 'char inline-block';
                    span.textContent = char;
                    // avoid wrapping spaces with zero-width if needed
                    if (char === ' ') span.innerHTML = '&nbsp;';
                    frag.appendChild(span);
                }
                el.appendChild(frag);
                // style: inline-block to allow transform
                const spans = el.querySelectorAll<HTMLElement>('.char');
                spans.forEach(s => {
                    s.style.display = 'inline-block';
                    s.style.willChange = 'transform, opacity';
                });
                return spans;
            }

            ctx = gsap.context(() => {
                // HERO
                const titleEl = heroTitleRef.current!;
                const subtitleEl = heroSubtitleRef.current!;
                const heroBgEl = heroBgRef.current!;
                const scrollDot = scrollDotRef.current!;
                const heroTl = gsap.timeline();

                // split headline into chars
                const titleChars = splitToChars(titleEl);

                heroTl
                    .fromTo(
                        titleChars,
                        { y: 60, opacity: 0, rotationX: -15 },
                        { y: 0, opacity: 1, rotationX: 0, stagger: 0.03, duration: 0.7, ease: 'power3.out' },
                    )
                    .from(
                        subtitleEl,
                        { y: 18, opacity: 0, duration: 0.8, ease: 'power3.out' },
                        '-=0.35',
                    );

                // parallax hero background
                gsap.to(heroBgEl, {
                    yPercent: -12,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });

                // infinite subtle bounce for scroll indicator
                gsap.to(scrollDot, {
                    y: 12,
                    duration: 0.9,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut',
                });

                // TIMELINE - create an SVG vertical path sized to container
                const timelineContainer = timelineRef.current!;
                const svg = svgRef.current!;
                const path = pathRef.current!;

                // set viewBox & d to match container height (so getTotalLength is accurate)
                const containerHeight = Math.max(timelineContainer.offsetHeight, window.innerHeight) + 200;
                svg.setAttribute('viewBox', `0 0 100 ${containerHeight}`);
                path.setAttribute('d', `M50 0 L50 ${containerHeight}`);

                const pathLength = path.getTotalLength();
                gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength, transformOrigin: 'center' });

                gsap.to(path, {
                    strokeDashoffset: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: timelineContainer,
                        start: 'top+=100 top',
                        end: 'bottom top',
                        scrub: 0.8,
                    },
                });

                // animate each timeline item (text and icon)
                const items = Array.from(timelineContainer.querySelectorAll<HTMLElement>('.timeline-item'));
                items.forEach((item, i) => {
                    // side detection: if text block is left or right
                    // We'll look for md:text-right on the first column to infer side
                    const isLeft = item.classList.contains('timeline-left') || item.dataset.side === 'left';

                    // content (text) animate sliding from side & opacity
                    const content = item.querySelector<HTMLElement>('.timeline-content')!;
                    gsap.from(content, {
                        x: isLeft ? -80 : 80,
                        opacity: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    });

                    // icon pop
                    const iconWrap = item.querySelector<HTMLElement>('.timeline-icon')!;
                    gsap.from(iconWrap, {
                        scale: 0,
                        rotation: -30,
                        ease: 'back.out(1.6)',
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 88%',
                            toggleActions: 'play none none none',
                        },
                    });

                    // image placeholder zoom/fade
                    const imgWrap = item.querySelector<HTMLElement>('.timeline-image')!;
                    gsap.from(imgWrap, {
                        scale: 1.06,
                        opacity: 0,
                        duration: 1.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 88%',
                            toggleActions: 'play none none none',
                        },
                    });
                });

                // Philosophy & Team sections
                const teamCards = Array.from(document.querySelectorAll<HTMLElement>('.team-card'));
                gsap.from(teamCards, {
                    y: 28,
                    opacity: 0,
                    stagger: 0.12,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: teamRef.current!,
                        start: 'top 85%',
                    },
                });

                // team-card hover micro-interactions
                teamCards.forEach((card) => {
                    const img = card.querySelector<HTMLElement>('.team-img') || card.querySelector<HTMLElement>('img');
                    const overlay = card.querySelector<HTMLElement>('.team-overlay');

                    card.addEventListener('mouseenter', () => {
                        gsap.to(img, { scale: 1.06, duration: 0.5, ease: 'power2.out' });
                        if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.4, ease: 'power2.out' });
                    });
                    card.addEventListener('mouseleave', () => {
                        gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
                        if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.out' });
                    });
                });

                // CTA reveal and button micro-hovers
                if (ctaRef.current) {
                    gsap.from(ctaRef.current, {
                        y: 36,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
                    });
                }

                if (btnRef.current) {
                    const btn = btnRef.current;
                    btn.addEventListener('mouseenter', () => {
                        gsap.to(btn, { scale: 1.03, boxShadow: '0px 18px 40px rgba(0,0,0,0.12)', duration: 0.25 });
                    });
                    btn.addEventListener('mouseleave', () => {
                        gsap.to(btn, { scale: 1, boxShadow: '0px 8px 18px rgba(0,0,0,0.06)', duration: 0.25 });
                    });
                }
            }, heroRef); // scope to heroRef to make cleanup easier

        })();

        return () => {
            // cleanup
            try {
                if (ctx) ctx.revert();
                const ST = (gsap as any).globals?.ScrollTrigger || (window as any).ScrollTrigger;
                if (ST && ST.getAll) ST.getAll().forEach((t: any) => t.kill && t.kill());
            } catch (e) {
                // ignore cleanup errors
            }
        };
    }, []);

    /* ------------------------------
       Markup: the structure is intentionally very similar to your original.
       I add specific extra classes/data attributes to target things easily:
       - .timeline-item wrapper gets data-side for left/right logic (we also add timeline-left in markup)
       - timeline-icon wrapper and timeline-content / timeline-image to target animations
       - svg center line is absolute and uses the computed path
    -------------------------------*/

    return (
        <div className={`min-h-screen bg-background text-foreground ${cormorantSC.variable} ${montserrat.variable}`}>
            {/* HERO SECTION */}
            <section ref={heroRef} className="relative h-[100dvh] flex flex-col justify-center items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div ref={heroBgRef} className="absolute inset-0 bg-gradient-to-b from-black/90 to-background/80 w-full h-full" />
                    <div className="w-full h-full bg-gradient-to-tr from-background/20 to-foreground/5" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <h1 ref={heroTitleRef} className={`font-cormorant-sc uppercase tracking-[0.35em] text-5xl md:text-8xl font-thin mb-6 text-foreground`}>
                        <span className="block opacity-0 translate-y-10">Our</span>
                        <span className="block mt-2 opacity-0 translate-y-10">Journey</span>
                    </h1>
                    <p ref={heroSubtitleRef} className={`${montserrat.className} font-light text-sm md:text-lg max-w-2xl mx-auto text-foreground/70 tracking-widest opacity-0 translate-y-5`}>
                        A decade of perfecting the art of brows and celebrating natural beauty
                    </p>
                </div>

                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-12 rounded-full border border-foreground/30 flex justify-center p-2">
                        <div ref={scrollDotRef} className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse" />
                    </div>
                </div>
            </section>

            {/* TIMELINE SECTION */}
            <section ref={timelineRef} className="py-28 px-4 md:px-8 max-w-7xl mx-auto relative">
                <div className="text-center mb-24">
                    <h2 className={`font-cormorant-sc uppercase text-4xl md:text-6xl font-light mb-6 tracking-[0.2em]`}>
                        Shaping Beauty Through Time
                    </h2>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto" />
                </div>

                <svg ref={svgRef} className="absolute left-1/2 transform -translate-x-1/2 h-full w-6 pointer-events-none" aria-hidden="true">
                    <path ref={pathRef} d="M50 0 L50 1000" strokeWidth={0.5} stroke="url(#gradient)" strokeLinecap="round" fill="none" />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="30%" stopColor="oklch(0.94 0 0)" stopOpacity="0.3" />
                            <stop offset="70%" stopColor="oklch(0.94 0 0)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="space-y-36 md:space-y-48">
                    {/* TIMELINE ITEM 1 */}
                    <div className="timeline-item relative grid md:grid-cols-12 gap-10 items-center">
                        <div className="md:col-span-5 md:col-start-1 flex flex-col items-end text-right">
                            <div className="mb-2">
                                <span className={`${montserrat.className} text-xs font-semibold tracking-[0.3em] uppercase opacity-70`}>2012</span>
                            </div>
                            <h3 className={`font-cormorant-sc text-3xl md:text-4xl font-normal mb-4 leading-tight`}>
                                The First Studio
                            </h3>
                            <p className={`${montserrat.className} font-light text-sm md:text-base opacity-80 max-w-md`}>
                                Our founder opened a small studio with a vision to transform eyebrow artistry. Starting with just two chairs, she pioneered the natural brow movement.
                            </p>
                        </div>

                        <div className="md:col-span-2 md:col-start-6 flex justify-center">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center timeline-icon">
                                <div className="absolute inset-0 rounded-full border border-foreground/10"></div>
                                <div className="text-3xl md:text-4xl">✧</div>
                            </div>
                        </div>

                        <div className="md:col-span-5 md:col-start-7">
                            <div className="aspect-video bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10 rounded-sm overflow-hidden">
                                {/* Image placeholder */}
                            </div>
                        </div>
                    </div>

                    {/* TIMELINE ITEM 2 */}
                    <div className="timeline-item relative grid md:grid-cols-12 gap-10 items-center">
                        <div className="md:col-span-5 md:col-start-7 flex flex-col items-start">
                            <div className="mb-2">
                                <span className={`${montserrat.className} text-xs font-semibold tracking-[0.3em] uppercase opacity-70`}>2016</span>
                            </div>
                            <h3 className={`font-cormorant-sc text-3xl md:text-4xl font-normal mb-4 leading-tight`}>
                                Signature Technique
                            </h3>
                            <p className={`${montserrat.className} font-light text-sm md:text-base opacity-80 max-w-md`}>
                                After years of research, we developed our signature "Feather & Flow" technique. This innovative approach earned us the National Beauty Innovation Award.
                            </p>
                        </div>

                        <div className="md:col-span-2 md:col-start-6 flex justify-center">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center timeline-icon">
                                <div className="absolute inset-0 rounded-full border border-foreground/10"></div>
                                <div className="text-3xl md:text-4xl">✦</div>
                            </div>
                        </div>

                        <div className="md:col-span-5 md:col-start-1 order-first md:order-none">
                            <div className="aspect-video bg-gradient-to-bl from-foreground/5 to-foreground/10 border border-foreground/10 rounded-sm overflow-hidden">
                                {/* Image placeholder */}
                            </div>
                        </div>
                    </div>

                    {/* TIMELINE ITEM 3 */}
                    <div className="timeline-item relative grid md:grid-cols-12 gap-10 items-center">
                        <div className="md:col-span-5 md:col-start-1 flex flex-col items-end text-right">
                            <div className="mb-2">
                                <span className={`${montserrat.className} text-xs font-semibold tracking-[0.3em] uppercase opacity-70`}>2020</span>
                            </div>
                            <h3 className={`font-cormorant-sc text-3xl md:text-4xl font-normal mb-4 leading-tight`}>
                                Global Recognition
                            </h3>
                            <p className={`${montserrat.className} font-light text-sm md:text-base opacity-80 max-w-md`}>
                                Our work was featured in Vogue Beauty and Harper's Bazaar. We began training artists worldwide, establishing our academy to share our philosophy.
                            </p>
                        </div>

                        <div className="md:col-span-2 md:col-start-6 flex justify-center">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center timeline-icon">
                                <div className="absolute inset-0 rounded-full border border-foreground/10"></div>
                                <div className="text-3xl md:text-4xl">✶</div>
                            </div>
                        </div>

                        <div className="md:col-span-5 md:col-start-7">
                            <div className="aspect-video bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10 rounded-sm overflow-hidden">
                                {/* Image placeholder */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PHILOSOPHY SECTION */}
            <section className="py-28">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-12 gap-16 items-center">
                        <div className="md:col-span-6">
                            <div className="aspect-[4/5] bg-gradient-to-tr from-foreground/5 to-foreground/10 border border-foreground/10 rounded-sm overflow-hidden">
                                {/* Image placeholder */}
                            </div>
                        </div>

                        <div className="md:col-span-6">
                            <div className="mb-12">
                                <h2 className={`font-cormorant-sc text-5xl md:text-6xl font-light mb-6 tracking-[0.1em]`}>
                                    Our Philosophy
                                </h2>
                                <div className="w-32 h-px bg-foreground/20"></div>
                            </div>

                            <div className="space-y-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-px bg-foreground/50"></div>
                                        <h3 className={`${montserrat.className} uppercase text-sm font-semibold tracking-[0.3em] opacity-80`}>Natural Enhancement</h3>
                                    </div>
                                    <p className={`${montserrat.className} font-light text-base md:text-lg opacity-80 leading-relaxed`}>
                                        We believe in enhancing your natural features rather than creating artificial shapes. Each brow design is meticulously crafted to complement your unique facial structure.
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-px bg-foreground/50"></div>
                                        <h3 className={`${montserrat.className} uppercase text-sm font-semibold tracking-[0.3em] opacity-80`}>Precision & Artistry</h3>
                                    </div>
                                    <p className={`${montserrat.className} font-light text-base md:text-lg opacity-80 leading-relaxed`}>
                                        Every stroke is intentional. Our artists train for over 500 hours to master the delicate balance between symmetry, proportion, and personal expression.
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-px bg-foreground/50"></div>
                                        <h3 className={`${montserrat.className} uppercase text-sm font-semibold tracking-[0.3em] opacity-80`}>Sustainable Beauty</h3>
                                    </div>
                                    <p className={`${montserrat.className} font-light text-base md:text-lg opacity-80 leading-relaxed`}>
                                        We're committed to eco-conscious practices, from our cruelty-free products to our waste-reduction initiatives. Beauty should honor both people and planet.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEAM SECTION */}
            <section ref={teamRef} className="py-28 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className={`font-cormorant-sc uppercase text-4xl md:text-6xl font-light mb-6 tracking-[0.2em]`}>
                        The Artists Behind the Brows
                    </h2>
                    <p className={`${montserrat.className} font-light text-base max-w-2xl mx-auto opacity-80`}>
                        Our team of certified brow artists brings together decades of experience and a shared passion for perfection
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="group team-card">
                            <div className="relative overflow-hidden mb-6 aspect-square">
                                <div className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10 team-img" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end items-center p-6 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 team-overlay">
                                    <p className={`${montserrat.className} text-center text-sm text-background opacity-90 mb-4`}>
                                        Certified Master Artist with 8 years of experience specializing in microblading and brow lamination
                                    </p>
                                    <div className="w-8 h-px bg-background/50 mb-4"></div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full border border-background/30 flex items-center justify-center">
                                            <span className="text-xs">IG</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-background/30 flex items-center justify-center">
                                            <span className="text-xs">IN</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className={`font-cormorant-sc text-xl font-normal mb-1`}>Elena Rossi</h3>
                            <p className={`${montserrat.className} text-xs tracking-[0.2em] uppercase opacity-70`}>Founder & Creative Director</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section ref={ctaRef} className="py-28">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className={`font-cormorant-sc text-5xl md:text-7xl font-light mb-8 tracking-[0.1em]`}>
                        <span className="block">Become Part</span>
                        <span className="block">Of Our Story</span>
                    </h2>
                    <p className={`${montserrat.className} font-light text-lg max-w-2xl mx-auto mb-12 opacity-80`}>
                        Experience the difference of artistry crafted over a decade. Book your bespoke brow transformation today.
                    </p>
                    <button ref={btnRef} className={`
                    ${montserrat.className} relative overflow-hidden
                    uppercase px-12 py-5 tracking-[0.3em] text-sm font-medium
                    bg-foreground text-background
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
                    transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]
                    hover:tracking-[0.4em] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]
                `}>
                        <span className="relative z-10">Book Consultation</span>
                    </button>
                </div>
            </section>
        </div>
    );
}