// app/services/[id]/ServiceDetails.tsx
'use client';

import { useRef } from 'react';
import { Cormorant_SC, Montserrat } from "next/font/google";
import Image from 'next/image';
import TextPressure from '@/components/ui/textpressure';
import { ChevronDown } from 'lucide-react';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '600', '700'],
    variable: '--font-montserrat',
    display: 'swap',
});

const cormorantSC = Cormorant_SC({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-cormorant-sc',
});

export default function ServiceDetails({ service }: { service: any }) {
    const container = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={container}
            className={`relative h-[100vh] bg-background text-foreground flex items-center justify-center ${cormorantSC.variable} ${montserrat.variable}`}
        >
            {/* Imagem como fundo */}
            <Image
                fetchPriority='high'
                src={'/images/pexels-danxavier-839633.avif'}
                width={1920}
                height={1080}
                alt='Hero Image'
                className='absolute inset-0 h-full w-full object-cover z-0'
            />

            {/* Texto sobre a imagem */}
            <div className='relative z-10 text-center'>
                <div className='flex flex-col justify-between items-center gap-2'>
                    <div className='flex justify-center items-center gap-2'>
                        <div style={{ position: 'relative', width:'60vw' , height: '400px' }}>
                            <TextPressure
                                text={service.title}
                                flex={true}
                                alpha={false}
                                stroke={false}
                                width={true}
                                weight={true}
                                italic={true}
                                textColor="#ffffff"
                                strokeColor="#ff0000"
                                minFontSize={64}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
                <ChevronDown className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                <span className={`${montserrat.className} mt-1 text-xs sm:text-sm tracking-widest text-white`}>
                    SCROLL
                </span>
            </div>
        </section>
    );
}
