"use client"

import { Instagram } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Cormorant_SC, Montserrat } from "next/font/google"

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

export function Footer() {
    return (
        <footer className={`${montserrat.className} bg-black text-white tracking-wider py-12 px-5 md:px-6`}>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column - Brand & Social */}
                    <div className="space-y-4">
                        <h2 className={`${cormorantSC.className} text-4xl font-bold uppercase`}>
                            beauty studio
                        </h2>
                        <p className="text-2xl uppercase">
                            Realçando sua beleza natural.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="https://instagram.com"
                                className="flex flex-col items-center justify-center gap-1 hover:text-neutral-300 transition"
                            >
                                <div className="text-md uppercase">Instagram</div>
                                <Instagram className="h-10 w-10" />
                            </Link>
                        </div>
                    </div>

                    {/* Middle Column - Contact & Courses */}
                    <div className="space-y-4">
                        <h3 className={`${cormorantSC.className} text-3xl font-semibold`}>
                            Atendimento
                        </h3>
                        <div className="flex flex-col gap-1">
                            <a href="tel:+5599123456789" className="hover:text-neutral-300">
                                +55 (99) 12345-6789
                            </a>
                            <a href="mailto:contato@beautystudio.com" className="break-all hover:text-neutral-300">
                                contato@beautystudio.com
                            </a>
                        </div>

                        <div className="mt-8">
                            <h3 className={`${cormorantSC.className} text-3xl font-semibold mb-4`}>
                                Cursos & Especializações
                            </h3>
                            <ul className="space-y-2 text-sm uppercase">
                                <li>
                                    <Link href="#" className="hover:underline">
                                        Curso Profissional de Maquiagem
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline">
                                        Design de Sobrancelhas Avançado
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline">
                                        Técnicas de Pele & Acabamento HD
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - FAQ */}
                    <div>
                        <h3 className={`${cormorantSC.className} text-3xl font-semibold mb-4`}>
                            FAQ
                        </h3>
                        <Accordion type="single" collapsible className="w-full text-base">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Quanto tempo dura uma sessão de maquiagem?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Em média, uma maquiagem profissional leva entre 60 e 90 minutos,
                                    dependendo do estilo escolhido.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    Preciso agendar com antecedência?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Sim, trabalhamos exclusivamente com horário marcado para garantir
                                    um atendimento personalizado.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    A maquiagem é resistente e durável?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Utilizamos produtos profissionais de alta qualidade, garantindo
                                    longa duração e acabamento impecável.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    Vocês atendem eventos como casamentos e formaturas?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Sim! Atendemos noivas, formandas e eventos especiais, inclusive
                                    com pacotes personalizados.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Linha divisória */}
                <div className="flex flex-col items-center justify-center">
                    <div className="w-[90vw] bg-white h-[1px] mt-10"></div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-neutral-800 text-center text-sm mt-6">
                    © 2025 All rights Reserved. Desenvolvido por{" "}
                    <a
                        href="https://leandrodevportfolio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-neutral-300"
                    >
                        Leandro Soares
                    </a>
                </div>
            </div>
        </footer>
    )
}
