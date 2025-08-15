'use client';

import { Cormorant_SC, Montserrat } from 'next/font/google';
import React, { useRef } from 'react';
import Image from 'next/image';
import DecryptedText from './ui/decryptedtext';
import { Button } from './ui/button';
import ScrollVelocity from './ui/scrollvelocity';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import BeeTrail from './ui/beetrail';

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

const Spot = ({ service }: { service: any }) => {

  const containersec2 = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containersec2}
      className={`relative h-[555vh] md:h-[400vh] lg:[350vh] bg-background text-foreground ${cormorantSC.variable} ${montserrat.variable}`}
    >
      {/* primeira sessão */}
      <div className="h-[200vh] flex flex-col justify-around items-center w-screen md:h-auto min-h-screen my-10 px-4">
        <h2 className={`mb-10 uppercase tracking-tight text-5xl md:text-8xl font-light text-center text-black ${montserrat.className}`}>
          Qualidade premium
        </h2>

        <div className="relative flex flex-col md:flex-row justify-between items-center w-full md:w-[80vw] min-h-[80vh] gap-10">

          {/* Imagem Esquerda */}
          <div className="flex flex-col items-center gap-2 w-full md:w-auto md:absolute md:bottom-0 md:left-0 max-w-[200px] px-4 md:px-0 animar">
            <p className={`text-[0.4rem] sm:text-xs md:text-[0.5rem] text-center ${montserrat.className} uppercase`}>
              Utilizamos produtos profissionais de beleza cuidadosamente selecionados para resultados visíveis, duradouros e seguros
            </p>
            <Image
              src="/images/pexels-fotios-photos-2035214.avif"
              alt="services"
              width={600}
              height={900}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Imagem Central */}
          <div className="w-full flex justify-center md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 animar">
            <Image
              src="/images/pexels-n-voitkevich-5128182.avif"
              alt="services"
              width={1200}
              height={1600}
              className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[30%] h-auto object-contain"
            />
          </div>

          {/* Imagem Direita */}
          <div className="flex flex-col items-center gap-4 w-full md:w-auto md:absolute md:top-0 md:right-0 max-w-[200px] px-4 md:px-0 animar">
            <Image
              src="/images/pexels-cottonbro-4056467.avif"
              alt="services"
              width={600}
              height={900}
              className="w-full h-auto object-contain"
            />
            <p className={`text-[0.4rem] sm:text-xs md:text-[0.5rem] text-center ${montserrat.className} uppercase`}>
              Ambientes preparados com tecnologia estética de ponta para um atendimento personalizado e eficaz em cada tratamento.
            </p>
          </div>
        </div>
      </div>


      {/* Segunda Seção */}
      <div className="md:h-auto h-[120vh] flex flex-col items-center gap-5 p-5 md:p-10">
        <div className="">
          <p className={`${montserrat.className} text-xl sm:text-2xl md:text-4xl font-light w-[90vw] md:w-[60vw] text-center uppercase text-black`}>
            {service.description}
          </p>
        </div>
        <div className="w-full h-auto md:h-full px-2 md:px-5 pt-10 md:pt-30">
          <div className="relative flex flex-col md:flex-row gap-8 md:gap-5 justify-around items-center h-auto md:h-full ">
            {/* Texto e botão */}
            <div className="w-full md:max-w-[20vw] h-auto flex flex-col justify-start items-center text-center md:text-left">
              <div className="h-auto mb-4">
                <p className={`${montserrat.className} uppercase text-[0.5rem] sm:text-xs md:text-[0.6rem] font-normal`}>
                  Utilizamos materiais de alta qualidade e tecnologia avançada para oferecer resultados excepcionais.
                  Nosso foco é valorizar sua beleza natural, despertando o que há de mais autêntico e poderoso em você.
                </p>
              </div>

              <div className="h-auto flex flex-col justify-around items-center gap-4">
                <h3 className={`${montserrat.className} uppercase text-4xl sm:text-5xl md:text-6xl font-bold text-black`}>
                  <DecryptedText
                    text={service.price}
                    speed={100}
                    characters="░▒▓█▌▐▄▀▄█ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!*&%"
                    animateOn="view"
                    encryptedClassName="text-5xl"
                    revealDirection="start"
                    sequential
                  />
                </h3>
                <a
                  href={`https://wa.me/5581997147184?text=${encodeURIComponent(
                    `Olá, tudo bem? 👋\n\nEstou visitando seu site e me interessei por um serviço:\n\n${service.title}\nPreço: ${service.price}\n\nGostaria de saber mais informações, por favor.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36
                flex items-center justify-center
                bg-[#ffe1c8] text-black
                rounded-full
                border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                text-sm tracking-wide uppercase
                transition-all duration-300 ease-in-out
                hover:bg-[#fff1e6] hover:scale-105 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]
                active:scale-95
                cursor-arrow-right
                ${montserrat.className}
              `}
                >
                  <DecryptedText
                    text="Agende"
                    speed={100}
                    maxIterations={20}
                    characters="ABCD1234!?"
                    className="revealed"
                    parentClassName="all-letters"
                    encryptedClassName="font-bold"
                    sequential
                  />
                </a>
              </div>
            </div>

            {/* Imagem do serviço */}
            <div className="w-full md:max-w-[20vw] flex flex-col gap-2 h-auto md:h-full items-center">
              <Image src={service.image} alt="services" width={900} height={900} className="h-[200px] sm:h-[300px] md:h-full w-auto object-contain" />
              <p className={`text-[0.5rem] sm:text-xs md:text-[0.5rem] text-start ${montserrat.className} uppercase`}>
                resultados de alta qualidade
              </p>
            </div>

            {/* Materiais usados */}
            <div className="w-full md:max-w-[20vw] items-center justify-center">
              <div className="flex gap-2 sm:gap-4 md:gap-0.5 h-auto md:h-full items-center justify-center">
                <Image src={'/placeholder.svg'} alt="services" width={900} height={900} className="lg:w-[100px] w-[80px] md:w-[50px] h-auto object-contain" />
                <Image src={'/placeholder.svg'} alt="services" width={900} height={900} className="lg:w-[100px] w-[80px] md:w-[50px] h-auto object-contain" />
                <Image src={'/placeholder.svg'} alt="services" width={900} height={900} className="lg:w-[100px] w-[80px] md:w-[50px] h-auto object-contain" />
              </div>
              <p className={`${montserrat.className} uppercase text-center md:text-end text-[0.5rem] sm:text-xs md:text-[0.6rem] font-normal`}>
                Materiais usados
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de etapas - duas colunas → uma coluna no mobile */}
      <div className="h-auto px-5 md:h-auto w-full flex flex-col md:flex-row relative mt-10">
        {/* lateral esquerda */}
        <div className="h-auto md:h-full w-full px-5 md:px-10 pb-10 md:pb-10 lg:pt-40 md:pt-0">
          <div className="w-full md:w-[35vw] h-auto flex flex-col gap-4 z-5">
            <h2 className={`${montserrat.className} uppercase tracking-wider font-light md:text-start text-center text-3xl md:text-4xl lg:text-7xl`}>
              visão geral das etapas
            </h2>
            <p className="text-sm sm:text-base md:text-xs text-center md:text-start z-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, consequuntur laudantium? Optio facilis deserunt sunt magni amet quam repellat explicabo at? Quidem sequi totam quod veniam fugiat adipisci iste consectetur!
            </p>
            <Button
              variant="ghost"
              className="
            w-40 sm:w-48 h-10 rounded-none
            bg-[#ffe1c8]
            border border-black
            text-black
            cursor-pointer
            btn-3d-shadow
            mx-auto md:mx-0 z-5
            "
            >
              Escolher
            </Button>
          </div>
          <Image
            src={'/images/lightimg.avif'}
            alt='ringlight'
            width={600}
            height={900}
            className='hidden md:block h-[900px] absolute bottom-0 -left-40 w-auto object-contain mask-gradient-top z-1 pointer-events-none select-none'
          />
        </div>

        {/* Direita */}
        <div className=" h-full w-full flex gap-10 pt-10 pb-20 pr-10 z-2">
          <div className="flex flex-col justify-center gap-36">
            {/* ITEM 1 */}
            <div className="max-w-[28rem]">
              <p className={`${montserrat.className} text-3xl lg:text-5xl font-semibold mb-2`}>01</p>
              <p className={`${montserrat.className} text-sm  lg:text-xl font-semibold uppercase tracking-wide mb-3`}>{service.passos.passo1.title}</p>
              <p className={`${montserrat.className} text-xs lg:text-sm font-light leading-relaxed`}>
                {service.passos.passo1.desc}
              </p>
            </div>

            {/* ITEM 3 */}
            <div className="max-w-[28rem]">
              <p className={`${montserrat.className} text-3xl lg:text-5xl font-semibold mb-2`}>03</p>
              <p className={`${montserrat.className} text-sm lg:text-xl font-semibold uppercase tracking-wide mb-3`}>{service.passos.passo3.title}</p>
              <p className={`${montserrat.className} text-xs lg:text-sm font-light leading-relaxed`}>
                {service.passos.passo3.desc}
              </p>
            </div>

            {/* ITEM 5 */}
            <div className="max-w-[28rem]">
              <p className={`${montserrat.className} text-3xl lg:text-5xl font-semibold mb-2`}>05</p>
              <p className={`${montserrat.className} text-sm lg:text-xl font-semibold uppercase tracking-wide mb-3`}>{service.passos.passo5.title}</p>
              <p className={`${montserrat.className} text-xs lg:text-sm font-light leading-relaxed`}>
                {service.passos.passo5.desc}
              </p>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="flex flex-col justify-center gap-36">
            {/* ITEM 2 */}
            <div className="max-w-[28rem]">
              <p className={`${montserrat.className} text-3xl lg:text-5xl font-semibold mb-2`}>02</p>
              <p className={`${montserrat.className} text-sm lg:text-xl font-semibold uppercase tracking-wide mb-3`}>{service.passos.passo2.title}</p>
              <p className={`${montserrat.className} text-xs lg:text-sm font-light leading-relaxed`}>
                {service.passos.passo2.desc}
              </p>
            </div>

            {/* ITEM 4 */}
            <div className="max-w-[28rem]">
              <p className={`${montserrat.className} text-3xl lg:text-5xl font-semibold mb-2`}>04</p>
              <p className={`${montserrat.className} text-sm lg:text-xl font-semibold uppercase tracking-wide mb-3`}>{service.passos.passo4.title}</p>
              <p className={`${montserrat.className} text-xs lg:text-sm font-light leading-relaxed`}>
                {service.passos.passo4.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ScrollVelocity
        texts={[
          'Design Estratégico',
          'Experiência Premium',
        ]}
        velocity={50}
        className="custom-scroll-text"
      />
      {/* Animação para desenvolver */}
      {/* <div className="w-full h-full">
        <BeeTrail />
      </div> */}
    </section>
  )
};

export default Spot;