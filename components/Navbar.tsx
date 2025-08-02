'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Cormorant_SC, Montserrat } from 'next/font/google'
import { Button } from './ui/button'
import { services } from '@/data'
import FlowingMenu from './ui/flowingmenu'
import { useState, useEffect } from 'react'

const cormorantSC = Cormorant_SC({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-cormorant-sc',
    display: 'swap',
})

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-montserrat',
    display: 'swap',
})

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    return (
        <nav
            className={cn(
                montserrat.className,
                "top-0 left-0 w-full z-50 p-4 uppercase backdrop-blur transition-all duration-500",
                isOpen ? "min-h-screen" : "h-15",
                "lg:fixed",
                "fixed",
            )}

        >
            <div className={cn("flex justify-between items-center max-w-6xl mx-auto", isOpen ? "text-white" : "text-foreground")}>
                <div className='flex items-start'>
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={50}
                        height={50}
                        className='-translate-y-3 z-50'
                    />
                    <Link href="/" className={`${cormorantSC.className} text-white tracking-wider font-bold text-xl z-50 relative`}>
                        SH BEAUTY
                    </Link>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-8 h-8 flex flex-col gap-2 items-center z-50 -translate-y-3"
                    aria-label="Toggle Menu"
                >
                    <span className={cn("w-8 h-0.5 bg-white transition-all duration-500", isOpen ? "rotate-45 translate-y-3" : "")} />
                    <span className={cn("w-8 h-0.5 bg-white transition-all duration-500", isOpen ? "opacity-0" : "")} />
                    <span className={cn("w-8 h-0.5 bg-white transition-all duration-500", isOpen ? "-rotate-45 -translate-y-3" : "")} />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="fullscreen-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            "inset-0 bg-black text-white flex flex-col md:flex-row z-40 p-5 md:p-10",
                            "fixed",
                            "overflow-y-auto"
                        )}
                    >

                        <div className="w-full md:w-1/2 p-10 flex flex-col justify-between">
                            <div>
                                <h2 className="lg:text-8xl text-2xl mb-10">MENU</h2>
                                <div className="flex gap-4 mb-4 text-sm">
                                    <Link href="#">FACEBOOK</Link>
                                    <Link href="#">INSTAGRAM</Link>
                                </div>
                                <nav className="flex flex-col gap-2 lg:text-lg text-sm">
                                    <Link href="#" onClick={() => setIsOpen(false)}>/ NOSSA HISTÓRIA</Link>
                                    <Link href="#" onClick={() => setIsOpen(false)}>/ JORNAL</Link>
                                    <Link href="#" onClick={() => setIsOpen(false)}>/ LOCALIZAÇÃO</Link>
                                    <Link href="#" onClick={() => setIsOpen(false)}>/ SERVIÇOS</Link>
                                </nav>
                            </div>
                            <div className="mt-8">
                                <p className="font-bold text-sm mb-2">AGENDAMENTO</p>
                                <nav className="flex flex-col gap-2 lg:text-sm text-xs">
                                    <Link href="#">/ AGENDAR VIA WHATSAPP</Link>
                                    <Link href="#">/ AGENDAR VIA TELEFONE</Link>
                                </nav>
                                <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-end my-6 ">
                                    <Image
                                        src="/images/pexels-danxavier-839633.avif"
                                        alt="Booking"
                                        width={300}
                                        height={300}
                                        className="object-cover"
                                    />
                                    <div className="h-full">
                                        <Button
                                            variant={'default'}
                                            size="lg"
                                            className="h-full px-6 py-4 bg-black text-white border border-white rounded-none text-lg flex items-center justify-center row-span-2"
                                        >
                                            CONTATE-NOS
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center gap-2">
                            <div style={{ height: '600px', position: 'relative' }}>
                                <FlowingMenu items={services} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
