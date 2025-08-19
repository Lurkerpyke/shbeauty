"use client";

/**
 * @module Coming
 * @description
 * Componente de página "Em construção" para Next.js, estilizado e animado.
 * Exibe uma mensagem informando que a página está em desenvolvimento, com animações GSAP,
 * fontes personalizadas do Google Fonts, e um background interativo (Ballpit) em desktops.
 *
 * ## Dependências
 * - React (hooks: useEffect, useRef, useState)
 * - next/dynamic (para importação dinâmica do Ballpit, evitando SSR issues)
 * - next/font/google (para fontes Cormorant_SC e Montserrat)
 * - gsap (para animações)
 * - next/link (para navegação interna)
 *
 * ## Props
 * @typedef {Object} ComingProps
 * @property {string} [title] - Título principal exibido na página. Default: "Were creating something beautiful"
 * @property {string} [subtitle] - Subtítulo explicativo. Default: "This page is under construction — check back soon."
 * @property {string} [eta] - Informação de previsão de lançamento. Default: "Launching soon"
 * @property {string} [note] - Nota ou link para atualizações. Default: "Subscribe for updates"
 *
 * ## Uso
 * ```tsx
 * import Coming from "./components/comming";
 * 
 * export default function Page() {
 *   return <Coming title="Novo site em breve" subtitle="Aguarde novidades!" />;
 * }
 * ```
 *
 * ## Observações
 * - O Ballpit (background animado) só aparece em telas desktop (>= 1024px) e pode ser encontrado no site https://www.reactbits.dev/backgrounds/ballpit.
 * - Animações são desativadas se o usuário preferir "reduzir movimento" (acessibilidade).
 * - O componente utiliza CSS-in-JS via `<style jsx>`.
 * - Para funcionamento correto, instale as dependências:
 *   - `npm install gsap next`
 *   - As fontes são carregadas via `next/font/google`.
 *
 * @component
 * @param {ComingProps} props
 * @returns
 */

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Cormorant_SC, Montserrat } from "next/font/google";
import gsap from "gsap";
import Link from "next/link";

// evita problemas com SSR (window/document)
const Ballpit = dynamic(() => import("./ui/ballpit"), { ssr: false });

const cormorantSC = Cormorant_SC({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-cormorant-sc",
    display: "swap",
});

const monserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "600", "700"],
    variable: "--font-montserrat",
    display: "swap",
});

type ComingProps = {
    title?: string;
    subtitle?: string;
    eta?: string;
    note?: string;
};

export default function Coming({
    title = "Were creating something beautiful",
    subtitle = "This page is under construction — check back soon.",
    eta = "Launching soon",
    note = "Subscribe for updates",
}: ComingProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const headlineRef = useRef<HTMLHeadingElement | null>(null);
    const subRef = useRef<HTMLParagraphElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const dotsRef = useRef<HTMLDivElement | null>(null);

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                svgRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.9 }
            )
                .from(headlineRef.current, { y: 24, opacity: 0, letterSpacing: "0.25em" }, "-=0.45")
                .from(subRef.current, { y: 12, opacity: 0 }, "-=0.35");

            const dots = dotsRef.current?.querySelectorAll(".dot");
            if (dots && dots.length > 0) {
                tl.from(
                    dots,
                    {
                        y: 8,
                        opacity: 0,
                        stagger: 0.4,
                        duration: 0.8,
                        repeat: -1,
                        ease: "back.out(1.2)",
                    },
                    "-=0.35"
                );
            }

            gsap.to(rootRef.current, {
                boxShadow: "0 30px 60px rgba(2,6,23,0.08)",
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            return () => tl.kill();
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <main
            ref={rootRef}
            className={`relative z-0 min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-white px-6 py-12 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 ${monserrat.variable} ${cormorantSC.variable}`}
            style={{ minHeight: "100vh" }}
        >
            {/* BACKGROUND (Ballpit) - ocupa todo o main */}
            {isDesktop && (
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                    }}
                    aria-hidden
                >
                    <div style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
                        <Ballpit
                            count={20}
                            gravity={0.1}
                            friction={0.9975}
                            wallBounce={0.95}
                            followCursor={false}
                        />
                    </div>
                </div>
            )}

            {/* conteúdo (sempre acima do background) */}
            <section
                aria-live="polite"
                className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
                {/* Coluna da Esquerda */}
                {/* SVG */}
                <div className="md:col-span-7 flex items-center justify-center">
                    <div className="relative w-full max-w-xl">
                        <svg
                            ref={svgRef}
                            viewBox="0 0 800 600"
                            preserveAspectRatio="xMidYMid meet"
                            className="w-full h-auto pointer-events-none select-none"
                            role="img"
                            aria-hidden="true"
                        >
                            <defs>
                                <linearGradient id="g1" x1="0" x2="1">
                                    <stop offset="0%" stopColor="#f8fafc" />
                                    <stop offset="100%" stopColor="#eef2ff" />
                                </linearGradient>
                                <linearGradient id="g2" x1="0" x2="1">
                                    <stop offset="0%" stopColor="#4b1188" />
                                    <stop offset="100%" stopColor="#6366f1" />
                                </linearGradient>
                            </defs>

                            {/* Bola curva*/}
                            <g transform="translate(100,60)">
                                <path
                                    d="M97.2,-68.2C123.2,-46.5,136.3,-13,124.8,15.6C113.3,44.1,77.1,66.6,41.7,80.2C6.3,93.8,-28.3,98.6,-58.5,85.1C-88.8,71.6,-114.7,39.9,-118.4,6.3C-122.1,-27.3,-103.7,-61.8,-74.1,-83.7C-44.4,-105.6,-22.2,-114.9,6.8,-121.1C35.8,-127.3,71.6,-130,97.2,-68.2Z"
                                    transform="translate(220 200) scale(1.2)"
                                    fill="url(#g1)"
                                    opacity="0.95"
                                />

                                <path
                                    d="M122.1,-84.9C152.4,-58.2,174.9,-29.1,177,1.6C179,32.3,160.6,64.6,131.9,89.2C103.1,113.7,64.1,130.6,29.2,131.8C-5.8,133,-36.7,118.5,-66.8,99.6C-96.9,80.7,-126.3,57.3,-141.7,26.6C-157.1,-4.1,-158.6,-41,-139.6,-67.8C-120.6,-94.6,-81.1,-111.2,-44.9,-128.9C-8.7,-146.7,23.3,-165.7,54.9,-159.2C86.5,-152.7,117.1,-121.6,122.1,-84.9Z"
                                    transform="translate(200 150) scale(0.9)"
                                    fill="url(#g2)"
                                    opacity="0.18"
                                />

                                {/* Linhas de precisão */}
                                <g opacity="0.65">
                                    <circle cx="420" cy="110" r="54" fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="2" />
                                    <circle cx="520" cy="220" r="8" fill="#6366f1" />
                                </g>
                            </g>
                        </svg>

                        <div className="absolute bottom-6 left-4 md:left-8 backdrop-blur-md bg-white/60 dark:bg-slate-900/50 rounded-2xl p-4 shadow-lg border border-transparent dark:border-white/5">
                            <div className="text-xs uppercase tracking-widest font-medium text-slate-500">{eta}</div>
                            <a href={note} target="_blank" rel="noopener noreferrer" className="break-all mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                                {note}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Coluna da Direita */}
                {/* Conteúdo */}
                <div className="md:col-span-5 flex flex-col justify-center gap-6">
                    <h1 ref={headlineRef} className={`leading-tight text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extralight text-slate-900 dark:text-white ${cormorantSC.className}`} style={{ fontWeight: 300 }}>
                        <span className="block">{title.split(" ").slice(0, 3).join(" ")}</span>
                        <span className="block text-purple-700">{title.split(" ").slice(3).join(" ")}</span>
                    </h1>

                    <p ref={subRef} className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                        {subtitle}
                    </p>

                    <div className="flex items-center gap-4">
                        <div ref={dotsRef} className="flex items-center gap-2" aria-hidden>
                            <span className="dot w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" />
                            <span className="dot w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" />
                            <span className="dot w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" />
                        </div>

                        <div className="flex-1">
                            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <div className="progress-bar animate-[progress_3.5s_linear_infinite]" />
                            </div>
                            <div className="mt-2 text-xs text-slate-500">Estamos desenvolvendo — pequenas batches, qualidade alta.</div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <Link href="/" className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium shadow-sm border border-transparent bg-gradient-to-r from-purple-800 to-purple-300 text-white hover:scale-[1.02] active:scale-[0.99] transition-transform">
                            Voltar para o início
                        </Link>

                        <a href="https://leandrodevportfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 dark:text-slate-300 underline-offset-4 hover:underline">
                            Deseja Ter Seu Próprio Site?
                        </a>
                    </div>
                </div>
            </section>

            {/* Acessibilidade para leitor de tela */}
            <span className="sr-only">Esta página está em construção</span>

            {/* Estilo e Animação aplicado em js */}
            <style jsx>{`
        :root {
          --font-cormorant-sc: ${cormorantSC.style?.fontFamily || "'Cormorant SC', serif"};
          --font-montserrat: ${monserrat.style?.fontFamily || "'Montserrat', sans-serif"};
        }
        h1 { font-family: var(--font-cormorant-sc), serif; }
        main { font-family: var(--font-montserrat), system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }

        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }

        .progress-bar {
          height: 100%;
          width: 40%;
          background-color: #6366f1;
          border-radius: 9999px;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-[progress_5s_linear_infinite],
          *[data-gsap] {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

        </main>
    );
}
