'use client';

import CircularText from "@/components/ui/circulartext";
import { Cormorant_SC, Montserrat } from "next/font/google";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';

const cormorantSC = Cormorant_SC({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-cormorant-sc',
    display: 'swap',
});

const monserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-montserrat',
    display: 'swap',
});

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (!imageRef.current || !containerRef.current) return;

        const texts = gsap.utils.toArray('.texto');

        if (window.innerWidth >= 768) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                    pin: true,
                },
            });

            tl.to(texts, {
                opacity: 0,
                display: 'none',
                duration: 1,
                ease: "none",
            }, 0);

            tl.to(imageRef.current, {
                scale: 2,
                duration: 1.5,
                xPercent: -50,
                ease: "none",
            }, 0);
        } else {
            // Animação para mobile
            const tlMobile = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                    pin: true,
                },
            });

            tlMobile.to(texts, {
                opacity: 0,
                duration: 1,
                ease: "none",
            }, 0);

            tlMobile.to(imageRef.current, {
                scale: 1.5,
                height: '100vh',
                width: '100vw',
                yPercent: -60,
                duration: 1.5,
                ease: "none",
            }, 0);
        }
    }, []);

    return (
        <section ref={containerRef} className="h-[100vh] overflow-hidden relative pt-15 lg:pt-0 bg-background">
            <div className="relative h-full flex flex-col gap-3 md:justify-center justify-start">
                <CircularText
                    text="QUALIDADE*QUALIDADE*"
                    onHover="speedUp"
                    spinDuration={20}
                    className="absolute left-1/2 top-10 sm:top-20 translate-x-[-50%] texto hidden md:block"
                />

                <div className="flex flex-col gap-2 md:gap-5 px-6 md:px-20 z-10 relative">
                    <div className="flex gap-3 sm:gap-5 items-center">
                        <p className={`${cormorantSC.className} tracking-wider text-xl sm:text-3xl texto`}>001</p>
                        <span className={`${cormorantSC.className} texto tracking-wider font-bold text-lg sm:text-2xl p-1`}>
                            SH BEAUTY
                        </span>
                    </div>

                    <h1 className={`${cormorantSC.className} texto uppercase tracking-wider font-bold text-3xl sm:text-7xl`}>
                        Sobrancelhas
                    </h1>

                    <div className="flex w-full">
                        <div className="flex flex-col gap-5 max-w-full sm:max-w-[40vw]">
                            <h3 className={`${monserrat.className} text-md sm:text-2xl font-medium texto`}>
                                Feito para o seu olhar. Pensado para ser só seu.
                            </h3>
                            <p className={`${monserrat.className} text-sm sm:text-md texto`}>
                                Cada design é mapeado para se ajustar ao formato e à personalidade do seu olhar. O trabalho é feito fio a fio, respeitando seus traços naturais e acompanhando seus movimentos. Seja você fã de um estilo mais delicado ou marcante, o resultado é sempre o mesmo: sobrancelhas que parecem ter nascido com você.
                            </p>
                        </div>
                    </div>
                </div>
                <Image
                    fetchPriority="high"
                    ref={imageRef}
                    src="/images/pexels-alipazani-2772099.avif"
                    alt="Sobrancelhas"
                    width={500}
                    height={500}
                    className="w-full md:w-1/2 h-[40vh] md:h-[100vh] object-cover md:absolute md:top-0 md:right-0 md:-z-10 mt-5 md:mt-0"
                />
            </div>
            <div className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
                <ChevronDown className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                <span className={`${monserrat.className} mt-1 text-xs sm:text-sm tracking-widest text-white`}>
                    SCROLL
                </span>
            </div>
        </section>
    );
};

export default Hero;
