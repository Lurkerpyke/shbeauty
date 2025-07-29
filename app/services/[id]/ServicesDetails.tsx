// app/services/[id]/ServiceDetails.tsx
'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { Cormorant_SC, Montserrat } from "next/font/google";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Font setup
const cormorantSC = Cormorant_SC({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-cormorant-sc',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-montserrat',
});

export default function ServiceDetails({ service }: { service: any }) {
    const container = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<HTMLDivElement>(null);
    const sectionRef2 = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Register scroll triggers for all animated elements
        const animatedElements = gsap.utils.toArray<HTMLElement>(".animated-element");

        gsap.set(animatedElements, {
            opacity: 0,
            y: 40,
        });

        animatedElements.forEach((element) => {
            gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: false,
                    once: true,
                },
            });
        });
    }, { scope: container });

    return (
        <div
            ref={container}
            className={`min-h-screen bg-background text-foreground ${cormorantSC.variable} ${montserrat.variable}`}
        >
            <main className="pt-28 pb-20 max-w-6xl mx-auto px-4">
                {/* Breadcrumb */}
                <div className="mb-10 animated-element">
                    <div className="inline-flex items-center text-sm text-gray-500">
                        <a href="/services" className="hover:text-foreground transition-colors">Serviços</a>
                        <ChevronRight className="mx-2" size={16} />
                        <span className="font-medium">{service.title}</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-10 items-start">
                    {/* Service Image */}
                    <div className="w-full md:w-1/2">
                        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-foreground/20">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-auto object-cover transition-all duration-500"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent">
                                <div className="inline-flex items-center bg-background/90 px-4 py-2 rounded-full animated-element">
                                    <Sparkles className="mr-2" size={18} />
                                    <span className="font-medium">Serviço Popular</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service Details */}
                    <div className="w-full md:w-1/2">
                        <div className="mb-8">
                            <h1 className={`text-5xl font-bold mb-6 font-cormorant-sc animated-element`}>
                                {service.title}
                            </h1>

                            <div className="animated-element" style={{ transitionDelay: "0.2s" }}>
                                <span className="text-3xl font-bold bg-background px-4 py-2 rounded-lg inline-block border border-foreground/20">
                                    {service.price}
                                </span>
                            </div>
                        </div>

                        <div className="prose prose-lg mb-8 font-montserrat animated-element" style={{ transitionDelay: "0.3s" }}>
                            <p>{service.description}</p>
                        </div>

                        <div className="animated-element" style={{ transitionDelay: "0.4s" }}>
                            <button className="group flex items-center justify-between w-full max-w-sm bg-foreground text-background text-lg font-medium py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-foreground">
                                <span>Agendar Agora</span>
                                <span className="bg-background/20 p-2 rounded-full group-hover:bg-background/30 transition-all">
                                    <Calendar className="text-background" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="mt-24" ref={sectionRefs}>
                    <h2 className={`text-4xl font-bold text-center mb-12 font-cormorant-sc animated-element`}>
                        Como Funciona
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { num: 1, title: "Agendamento", desc: "Escolha data e horário" },
                            { num: 2, title: "Preparação", desc: "Chegue 10 minutos antes" },
                            { num: 3, title: "Sessão", desc: "Desfrute do seu tratamento" }
                        ].map((item, index) => (
                            <div
                                key={item.num}
                                className="bg-background p-6 rounded-lg shadow-md border border-foreground/20 animated-element"
                                style={{ transitionDelay: `${0.1 * index}s` }}
                            >
                                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center mb-4">
                                    <span className="text-foreground text-xl font-bold">{item.num}</span>
                                </div>
                                <h3 className="font-bold text-xl mb-2 font-cormorant-sc">{item.title}</h3>
                                <p className="text-foreground/80 font-montserrat">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="mt-24" ref={sectionRef2}>
                    <h2 className={`text-4xl font-bold text-center mb-12 font-cormorant-sc animated-element`}>
                        O Que Nossos Clientes Dizem
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Ana Silva", text: "Este serviço superou minhas expectativas! Profissionalismo e qualidade excepcionais." },
                            { name: "Carlos Oliveira", text: "Resultado incrível, valeu cada centavo. Recomendo fortemente!" },
                            { name: "Mariana Costa", text: "Atendimento perfeito e resultado maravilhoso. Voltarei com certeza!" }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-background p-6 rounded-lg shadow-lg border border-foreground/20 animated-element"
                                style={{ transitionDelay: `${0.1 * index}s` }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-foreground/10 border-2 border-dashed mr-4 flex items-center justify-center">
                                        <span className="text-foreground font-bold">{item.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg font-cormorant-sc">{item.name}</h4>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-foreground/80 italic font-montserrat">"{item.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}