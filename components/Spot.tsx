'use client';

import { Cormorant_SC, Montserrat } from 'next/font/google';
import React, { useRef } from 'react';
import Image from 'next/image';
import DecryptedText from './ui/decryptedtext';

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
    <section ref={containersec2} className={`relative h-[300vh] bg-background text-foreground ${cormorantSC.variable} ${montserrat.variable}`}>

      <div className='flex flex-col justify-around items-center w-[100vw] h-[100vh] my-10'>
        <h2 className={`uppercase tracking-tight text-8xl font-light text-black ${montserrat.className}`}>Qualidade premium</h2>
        <div className='flex relative justify-between items-center w-[80vw] h-[60vh] px-10'>
          <div className='absolute bottom-0 left-0 flex flex-col items-center gap-2 max-w-[15%] animar'>
            <Image src={'/images/pexels-fotios-photos-2035214.avif'} alt='services' width={600} height={900} className='h-[300px] w-auto object-contain' />
            <p className={`text-[0.5rem] text-center ${montserrat.className} uppercase`}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <Image src={'/images/pexels-n-voitkevich-5128182.avif'} alt='services' width={1200} height={1600} className='h-[800px] w-auto max-w-[30%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animar object-contain' />

          <div className='absolute top-0 right-0 flex flex-col items-center gap-4 max-w-[15%] object-contain animar'>
            <Image
              src={'/images/pexels-cottonbro-4056467.avif'}
              alt='services'
              width={600}
              height={900}
              className='h-[300px] w-auto'
            />
            <p className={`text-[0.5rem] text-center ${montserrat.className} uppercase`}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
      <div className='h-[100vh] flex flex-col items-center gap-5 p-10'>
        <div className=''>
          <p className={`${montserrat.className} text-4xl font-light w-[60vw] text-center uppercase text-black`}>{service.description}</p>
        </div>
        <div className='w-full h-full px-5 pt-30'>
          <div className='relative flex gap-5 justify-around items-center h-full '>
            <div className='max-w-[20vw] h-full flex flex-col justify-start items-center'>
              <div className='h-[30%]'>
                <p className={`${montserrat.className} uppercase text-start text-[0.5rem] font-normal`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis asperiores accusamus repellendus deserunt doloremque reprehenderit corrupti earum quam.</p>
              </div>
              <div className='h-[80%] flex flex-col justify-around items-center'>
                <h3 className={`${montserrat.className} uppercase text-center text-6xl font-bold text-black`}>
                  <div style={{ marginTop: '0rem' }}>
                    <DecryptedText
                      text={service.price}
                      speed={100}
                      characters="░▒▓█▌▐▄▀▄█ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!*&%"
                      animateOn="view"
                      encryptedClassName="text-5xl"
                      revealDirection="start"
                      sequential
                    />
                  </div>
                </h3>
                <a
                  href={`https://wa.me/5581997147184?text=${encodeURIComponent(
                    `Olá, tudo bem? 👋\n\nEstou visitando seu site e me interessei por um serviço:\n\n${service.title}\nPreço: ${service.price}\n\nGostaria de saber mais informações, por favor.`
                  )}`}

                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    h-36 w-36
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
            <div className='max-w-[20vw] flex flex-col gap-2 h-full items-center'>
              <Image src={'/images/pexels-rasul-lotfi-16110887-31845455.avif'} alt='services' width={900} height={900} className='h-full w-auto object-contain' />

              <p className={`text-[0.5rem] text-start ${montserrat.className} uppercase`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
            </div>
            <div className='max-w-[20vw] items-center justify-center'>
              <div className='flex gap-0.5 h-full items-center justify-center'>
                <Image src={'/images/pexels-marcelochagas-2598179.avif'} alt='services' width={900} height={900} className='w-[100px] h-auto object-contain' />
                <Image src={'/images/pexels-marcelochagas-2598179.avif'} alt='services' width={900} height={900} className='w-[100px] h-auto object-contain' />
                <Image src={'/images/pexels-marcelochagas-2598179.avif'} alt='services' width={900} height={900} className='w-[100px] h-auto object-contain' />
              </div>
              <p className={`${montserrat.className} uppercase text-end text-[0.5rem] font-normal`}>Lorem, ipsum dolor sit amet</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
};

export default Spot;