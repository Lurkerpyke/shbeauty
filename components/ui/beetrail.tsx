"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type BeeTrailProps = {
    className?: string;
};

export default function BeeTrail({ className = "" }: BeeTrailProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const beeWrapRef = useRef<HTMLDivElement>(null);
    const wingLeftRef = useRef<SVGPathElement>(null);
    const wingRightRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        const container = containerRef.current!;
        const path = pathRef.current!;
        const beeWrap = beeWrapRef.current!;
        const wingL = wingLeftRef.current!;
        const wingR = wingRightRef.current!;

        if (!container || !path || !beeWrap) return;

        // ======= Configurações =======
        const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
        const PTS_MAX = 95;                 // tamanho do rastro (quantidade de pontos)
        const SPEED_MIN = reduced ? 28 : 65;
        const SPEED_MAX = reduced ? 55 : 120;
        const TURN_RATE = reduced ? 0.015 : 0.06;       // rotação aleatória por frame
        const BUZZ_AMP = reduced ? 0.2 : 0.9;          // intensidade do "buzz"
        const BUZZ_FREQ_X = 52;                        // frequência do buzz em X
        const BUZZ_FREQ_Y = 68;                        // frequência do buzz em Y
        const EDGE_PAD = 10;                           // acolchoamento das bordas

        // ======= Dimensões reativas =======
        let W = 300, H = 200;
        const ro = new ResizeObserver(() => {
            const b = container.getBoundingClientRect();
            W = Math.max(1, b.width);
            H = Math.max(1, b.height);
        });
        ro.observe(container);

        // ======= Estado do voo =======
        let x = W * 0.5;
        let y = H * 0.5;
        let angle = Math.random() * Math.PI * 2;
        let speed = gsap.utils.random(SPEED_MIN, SPEED_MAX);
        let t = 0; // tempo acumulado para buzz
        const points: Array<{ x: number; y: number }> = [];

        // setters rápidos (performance)
        const setX = gsap.quickSetter(beeWrap, "x", "px");
        const setY = gsap.quickSetter(beeWrap, "y", "px");
        const setRot = gsap.quickSetter(beeWrap, "rotation", "deg");

        // ======= Batida de asas =======
        const wingEase = "sine.inOut";
        const wingDur = reduced ? 0.18 : 0.06;
        const wingTweenL = gsap.to(wingL, {
            transformOrigin: "100% 50%",
            rotation: 22,
            repeat: -1,
            yoyo: true,
            ease: wingEase,
            duration: wingDur,
        });
        const wingTweenR = gsap.to(wingR, {
            transformOrigin: "0% 50%",
            rotation: -22,
            repeat: -1,
            yoyo: true,
            ease: wingEase,
            duration: wingDur,
        });

        // ======= Rastro tracejado animado =======
        // anina o dashoffset para sensação de "vida" no rastro
        const dashAnim = gsap.to(path, {
            attr: { "stroke-dashoffset": -1200 },
            repeat: -1,
            ease: "none",
            duration: reduced ? 6 : 3.2,
        });

        // ======= Loop principal =======
        const ticker = gsap.ticker.add(() => {
            const dr = gsap.ticker.deltaRatio(); // razão vs 60fps
            const step = (speed / 60) * dr;

            // pequena mudança de direção (wander)
            angle += gsap.utils.random(-TURN_RATE, TURN_RATE) * dr;

            // buzz orgânico (micro oscilações)
            t += dr / 60;
            const buzzX = Math.cos(t * BUZZ_FREQ_X) * BUZZ_AMP;
            const buzzY = Math.sin(t * BUZZ_FREQ_Y) * BUZZ_AMP;

            // avança
            x += Math.cos(angle) * step + buzzX;
            y += Math.sin(angle) * step + buzzY;

            // bordas: leve "repulsão" + reflexão sutil
            if (x < EDGE_PAD) {
                x = EDGE_PAD;
                angle = Math.PI - angle + gsap.utils.random(-0.2, 0.2);
            } else if (x > W - EDGE_PAD) {
                x = W - EDGE_PAD;
                angle = Math.PI - angle + gsap.utils.random(-0.2, 0.2);
            }
            if (y < EDGE_PAD) {
                y = EDGE_PAD;
                angle = -angle + gsap.utils.random(-0.2, 0.2);
            } else if (y > H - EDGE_PAD) {
                y = H - EDGE_PAD;
                angle = -angle + gsap.utils.random(-0.2, 0.2);
            }


            // atualiza posição e rotação (aponta a cabeça na direção do movimento)
            setX(x);
            setY(y);
            setRot((angle * 180) / Math.PI);

            // salva ponto para o rastro
            points.push({ x, y });
            if (points.length > PTS_MAX) points.shift();

            // desenha rastro (M L L L ...)
            if (points.length > 1) {
                const d = "M " + points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" L ");
                path.setAttribute("d", d);
            }
        });

        // ======= Cleanup =======
        return () => {
            ro.disconnect();
            gsap.ticker.remove(ticker as any);
            dashAnim.kill();
            wingTweenL.kill();
            wingTweenR.kill();
            gsap.killTweensOf(beeWrap);
            gsap.killTweensOf(path);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden rounded-lg ${className}`}
        >
            {/* SVG do rastro */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
            >
                <defs>
                    {/* leve desfoque e brilho para dar vida ao rastro */}
                    <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    ref={pathRef}
                    d="M 0,0"
                    fill="none"
                    stroke="#F59E0B"                 /* amber-500 */
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity="0.9"
                    strokeDasharray="10 8"           /* cria o "-----" */
                    strokeDashoffset="0"
                    filter="url(#soft-glow)"
                />
            </svg>

            {/* Abelhinha */}
            <div
                ref={beeWrapRef}
                className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{ width: 22, height: 22 }}
                aria-hidden
            >
                {/* Bee SVG (mínimo, com asas animáveis) */}
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    {/* corpo */}
                    <ellipse cx="11" cy="12" rx="6" ry="5" fill="#111827" />
                    {/* listras */}
                    <rect x="7.5" y="8.5" width="7" height="1.4" rx="0.7" fill="#F59E0B" />
                    <rect x="7" y="11" width="8" height="1.4" rx="0.7" fill="#F59E0B" />
                    <rect x="7.5" y="13.5" width="7" height="1.4" rx="0.7" fill="#F59E0B" />
                    {/* cabeça */}
                    <circle cx="6.5" cy="11.5" r="2.3" fill="#111827" />
                    <circle cx="5.9" cy="10.8" r="0.5" fill="#FFFFFF" />
                    {/* asas */}
                    <g opacity="0.9">
                        <path
                            ref={wingLeftRef}
                            d="M11 6 C9.5 4.5, 7 4.3, 6 6 C7.5 6.2, 9 6.8, 11 6 Z"
                            fill="#E5E7EB"
                        />
                        <path
                            ref={wingRightRef}
                            d="M13 6 C14.5 4.5, 17 4.3, 18 6 C16.5 6.2, 15 6.8, 13 6 Z"
                            fill="#E5E7EB"
                        />
                    </g>
                    {/* ferrão */}
                    <path d="M17 12 L20 12.5 L17 13" fill="#111827" />
                </svg>
            </div>
        </div>
    );
}
