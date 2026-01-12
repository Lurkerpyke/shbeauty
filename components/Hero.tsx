'use client';

import CircularText from "@/components/ui/circulartext";
import { Cormorant_SC, Montserrat } from "next/font/google";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useId } from 'react'; // Adicione useId

const cormorantSC = Cormorant_SC({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-cormorant-sc',
    display: 'swap',
});

const monserrat = Montserrat({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '600', '700'],
    variable: '--font-montserrat',
    display: 'swap',
});

interface props {
    numero: string;
    servico: string;
    subtitulo: string;
    paragrafo: string;
    srcImage: string;
    inverse?: boolean;
}

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ numero, servico, subtitulo, paragrafo, srcImage, inverse = false }: props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const uniqueId = useId(); // Gera um ID único para cada instância do componente

    useGSAP(() => {
        if (!imageRef.current || !containerRef.current) return;

        // CORREÇÃO: Usar seletores específicos para este componente
        const texts = containerRef.current.querySelectorAll(`.texto-${uniqueId}`);

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
                xPercent: inverse ? 50 : -50,
                ease: "none",
            }, 0);
        } else {
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
    }, [inverse, uniqueId]);

    return (
        <section ref={containerRef} className="h-[100vh] overflow-hidden relative pt-15 lg:pt-0 bg-background">
            <div className="relative h-full flex flex-col gap-3 md:justify-center justify-start">
                <CircularText
                    text="QUALIDADE*QUALIDADE*"
                    onHover="speedUp"
                    spinDuration={20}
                    className={`absolute left-1/2 top-10 sm:top-20 translate-x-[-50%] texto-${uniqueId} hidden md:block z-50`}
                />

                <div className="relative h-full flex md:flex-row flex-col">
                    <div className={`md:w-1/2 flex items-center justify-center ${inverse ? 'md:order-2' : ''}`}>
                        <div className={`flex flex-col gap-2 md:gap-5 px-6 md:px-20 z-10 w-full ${inverse ? 'md:text-right md:items-end' : ''}`}>
                            <div className={`flex ${inverse ? 'justify-end' : ''} gap-3 sm:gap-5 items-center`}>
                                <p className={`${monserrat.className} tracking-normal text-xl sm:text-3xl texto-${uniqueId} font-thin`}>
                                    {numero}
                                </p>
                                <span className={`${cormorantSC.className} translate-y-0.5 texto-${uniqueId} tracking-widest font-bold text-lg sm:text-2xl`}>
                                    BEAUTY STUDIO
                                </span>
                            </div>

                            <h1 className={`${cormorantSC.className} font-medium texto-${uniqueId} uppercase tracking-tight text-3xl sm:text-7xl`}>
                                {servico}
                            </h1>

                            <div className="flex w-full">
                                <div className={`flex flex-col gap-5 max-w-full ${inverse ? 'md:items-end' : ''} sm:max-w-[40vw]`}>
                                    <h3 className={`${monserrat.className} capitalize text-md sm:text-xl texto-${uniqueId} font-normal`}>
                                        {subtitulo}
                                    </h3>
                                    <p className={`${monserrat.className} text-sm sm:text-md texto-${uniqueId} leading-6 font-light ${inverse ? 'md:text-right' : ''}`}>
                                        {paragrafo}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`md:w-1/2 ${inverse ? 'md:order-1' : ''}`}>
                        <Image
                            fetchPriority="high"
                            ref={imageRef}
                            src={srcImage}
                            alt={servico}
                            width={500}
                            height={500}
                            className="w-full h-[40vh] md:h-[100vh] object-cover mt-5 md:mt-0"
                        />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
                <ChevronDown className="w-6 h-6 sm:w-10 sm:h-10" />
                <span className={`${monserrat.className} mt-1 text-xs sm:text-sm tracking-widest`}>
                    SCROLL
                </span>
            </div>
        </section>
    );
};

export default Hero;