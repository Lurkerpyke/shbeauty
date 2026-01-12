'use client';

import { useRef } from "react";
import CurvedLoop from "./ui/curvedloop";
import { Cormorant_SC, Montserrat } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cormorantSC = Cormorant_SC({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-cormorant-sc',
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-montserrat',
    display: 'swap',
});

gsap.registerPlugin(ScrollTrigger);

const Why = () => {

  const section2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const texts2 = gsap.utils.toArray<HTMLElement>(".texto2");

    gsap.set(texts2, {
      opacity: 0,
      y: 40,
    });

    gsap.to(texts2, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section2Ref.current,
        start: "top center-=100",
        end: "bottom center",
        scrub: false,
        once: true,
      },
    });
  }, []);

  return (
    <section className="dark:text-background bg-[url('/bg-sec2.avif')] bg-cover bg-center bg-no-repeat h-[100vh] bg-foreground w-full px-5 py-10 overflow-hidden flex flex-col justify-between items-center relative" ref={section2Ref}>

      {/* CurvedLoop sobe visualmente mas permanece no fluxo do layout */}
      <div className="w-full h-[40vh] -translate-y-[50vh]">
        <CurvedLoop
          marqueeText="Beleza ✦ Natural ✦ Criativa ✦"
          speed={3}
          curveAmount={500}
          direction="right"
          interactive={true}
          className=""
        />
      </div>

      <div className="flex flex-col items-center text-center max-w-2xl -translate-y-[25vh]">
        <h1 className={`${cormorantSC.className} texto2 tracking-wider text-4xl font-bold mb-4 capitalize`}>Por quê escolher a BEAUTY STUDIO?</h1>
        <p className={`${montserrat.className} texto2 text-lg`}>
          Estamos dedicados a fornecer as melhores soluções de beleza que realçam sua beleza natural com criatividade e cuidado.
        </p>
      </div>
    </section>
  );
};

export default Why;
