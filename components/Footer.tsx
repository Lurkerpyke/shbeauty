"use client"

import { Github, Instagram, Linkedin } from "lucide-react"
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
                        <h2 className={`${cormorantSC.className} text-4xl font-bold`}>SH BEAUTY</h2>
                        <p className="text-2xl uppercase">Let&apos;s make your dream come true.</p>
                        <div className="flex gap-4">
                            <Link href="https://github.com/Lurkerpyke" className="flex flex-col items-center justify-center gap-1 hover:text-neutral-300 transition">
                                <div className="text-xs uppercase">Github</div>
                                <Github className="h-6 w-6" />
                            </Link>
                            <Link href="https://instagram.com" className="flex flex-col items-center justify-center gap-1 hover:text-neutral-300 transition">
                                <div className="text-xs uppercase">Instagram</div>
                                <Instagram className="h-6 w-6" />
                            </Link>
                            <Link href="https://linkedin.com" className="flex flex-col items-center justify-center gap-1 hover:text-neutral-300 transition">
                                <div className="text-xs uppercase">LinkedIn</div>
                                <Linkedin className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>

                    {/* Middle Column - Contact & Bootcamps */}
                    <div className="space-y-4">
                        <h3 className={`${cormorantSC.className} text-3xl font-semibold`}>For Business</h3>
                        <div className="flex flex-col gap-1">
                            <a href="tel:+5599123456789" className="hover:text-neutral-300">+55 (99) 12345-6789</a>
                            <a href="mailto:exemplo@gmail.com" className="break-all hover:text-neutral-300">exemplo@gmail.com</a>
                        </div>

                        <div className="mt-8">
                            <h3 className={`${cormorantSC.className} text-3xl font-semibold mb-4`}>Bootcamps realizados</h3>
                            <ul className="space-y-2 text-sm uppercase">
                                <li>
                                    <Link href="https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science" className="hover:underline">
                                        Havard CS50X - edX
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.freecodecamp.org/learn/2022/responsive-web-design/" className="hover:underline">
                                        Responsive Web Design - FreeCodecamp
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.cursoemvideo.com/curso/python-3-mundo-3/" className="hover:underline">
                                        Python3 - Curso em Vídeo
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - FAQ */}
                    <div>
                        <h3 className={`${cormorantSC.className} text-3xl font-semibold mb-4`}>FAQ</h3>
                        <Accordion type="single" collapsible className="w-full text-base">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Quanto tempo até concluir um projeto?</AccordionTrigger>
                                <AccordionContent>
                                    O tempo de conclusão varia dependendo da complexidade do projeto. Projetos simples levam 2–4 semanas.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Como funciona o pagamento?</AccordionTrigger>
                                <AccordionContent>
                                    Aceitamos pagamento em duas parcelas: 50% no início e 50% na entrega.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Eu posso acompanhar o desenvolvimento?</AccordionTrigger>
                                <AccordionContent>
                                    Sim, você terá atualizações constantes e acesso ao progresso.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>O site vem com hospedagem e domínio?</AccordionTrigger>
                                <AccordionContent>
                                    Oferecemos suporte para configurar ambos, mas o custo é separado.
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
