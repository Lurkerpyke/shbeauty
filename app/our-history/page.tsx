'use client';

import { useState, useEffect, useRef } from 'react';
import { Montserrat, Cormorant_SC } from 'next/font/google';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles, Award, Users, Heart, Target, Leaf, Clock, Star, Calendar, MapPin, Eye, Palette } from 'lucide-react';

// Configuração das fontes
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const cormorantSC = Cormorant_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant-sc',
  display: 'swap',
});

// Registrar plugins do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dados da timeline
const timelineData = [
  {
    year: "2024",
    month: "Janeiro",
    title: "O Nascimento de um Sonho",
    description: "Abertura do primeiro estúdio com uma visão clara: transformar a arte das sobrancelhas em uma experiência personalizada e única para cada cliente.",
    icon: <Sparkles className="w-5 h-5" />,
    side: "left" as const,
  },
  {
    year: "2024",
    month: "Março",
    title: "Técnica Exclusiva",
    description: "Desenvolvimento da técnica 'Feather Flow', um método único que combina precisão milimétrica com design orgânico para resultados naturais.",
    icon: <Award className="w-5 h-5" />,
    side: "right" as const,
  },
  {
    year: "2024",
    month: "Julho",
    title: "Expansão da Equipe",
    description: "Seleção e treinamento dos primeiros artistas especializados, formando uma equipe unida pela paixão pela beleza natural.",
    icon: <Users className="w-5 h-5" />,
    side: "left" as const,
  },
  {
    year: "2024",
    month: "Dezembro",
    title: "Primeiro Reconhecimento",
    description: "Premiação no Concurso Nacional de Beleza Natural e início de parcerias com influencers do setor de beleza.",
    icon: <Star className="w-5 h-5" />,
    side: "right" as const,
  },
  {
    year: "2025",
    month: "Abril",
    title: "Novo Espaço",
    description: "Mudança para um estúdio maior e mais moderno, projetado para oferecer uma experiência completa de bem-estar e beleza.",
    icon: <MapPin className="w-5 h-5" />,
    side: "left" as const,
  },
];

// Dados da equipe
const teamData = [
  {
    name: "Carla Mendes",
    role: "Fundadora & Especialista Master",
    bio: "Mais de 8 anos de experiência em design facial e técnica feather. Formada na Academia Europeia de Estética.",
    image: "/placeholder.svg",
    color: "from-amber-50 to-orange-50",
    specialties: ["Design Facial", "Técnica Feather", "Correções"],
  },
  {
    name: "Ana Lúcia",
    role: "Especialista em Cor e Forma",
    bio: "Artista premiada com formação em colorimetria avançada. Especialista em harmonia facial e correção de tonalidades.",
    image: "/placeholder.svg",
    color: "from-rose-50 to-pink-50",
    specialties: ["Colorimetria", "Design Simétrico", "Maquiagem"],
  },
  {
    name: "Beatriz Costa",
    role: "Mestre em Técnicas Avançadas",
    bio: "Especialista em técnicas de fio a fio e microblading. Treinada nas mais recentes tecnologias do setor.",
    image: "/placeholder.svg",
    color: "from-violet-50 to-purple-50",
    specialties: ["Fio a Fio", "Microblading", "Nanoblading"],
  },
  {
    name: "Daniela Silva",
    role: "Especialista em Experiência",
    bio: "Garante que cada visita seja única e memorável, cuidando de todos os detalhes da sua jornada de beleza.",
    image: "/placeholder.svg",
    color: "from-emerald-50 to-teal-50",
    specialties: ["Consultoria", "Pós-cuidados", "Design Personalizado"],
  },
];

// Princípios filosóficos
const principles = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Beleza Natural",
    description: "Acreditamos em realçar sua beleza única, nunca em transformar você em outra pessoa.",
    color: "border-amber-200 bg-amber-50",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Precisão Artística",
    description: "Cada traço é pensado e executado com precisão milimétrica para resultados perfeitos.",
    color: "border-rose-200 bg-rose-50",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Atendimento Personalizado",
    description: "Cada cliente recebe uma consultoria detalhada para entender suas necessidades e desejos.",
    color: "border-violet-200 bg-violet-50",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Sustentabilidade",
    description: "Usamos produtos cruelty-free e práticas sustentáveis em todos os nossos processos.",
    color: "border-emerald-200 bg-emerald-50",
  },
];

// Estatísticas
const stats = [
  { number: "500+", label: "Clientes Satisfeitos" },
  { number: "98%", label: "Taxa de Retenção" },
  { number: "4.9", label: "Avaliação Média" },
  { number: "1000+", label: "Transformações Realizadas" },
];

export default function OurHistoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Função para scroll suave
  const scrollToTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animações do Hero
  useGSAP(() => {
    gsap.fromTo(".hero-title span",
      { y: 80, opacity: 0, rotationX: -10 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".hero-subtitle",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out"
      }
    );
  }, []);

  // Animações da Timeline
  useGSAP(() => {
    gsap.utils.toArray(".timeline-card").forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  // Animações das estatísticas
  const statsInView = useInView(statsRef, { once: true });

  // Animações dos cartões da equipe
  useGSAP(() => {
    gsap.fromTo(".team-member-card",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const philosophyInView = useInView(philosophyRef, { once: true, amount: 0.3 });

  return (
    <div className={`${cormorantSC.variable} ${montserrat.variable} min-h-screen bg-background text-foreground`}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted"
      >
        {/* Padrão de fundo sutil */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Elementos decorativos */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-tr from-muted to-transparent blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />

        {/* Conteúdo do Hero */}
        <div className="relative z-10 text-center px-4 md:px-8 max-w-6xl mx-auto">
          <div className="overflow-hidden mb-8">
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold">
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="block font-light tracking-tight"
              >
                Nossa
              </motion.span>
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="block mt-2 tracking-tighter"
              >
                História
              </motion.span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-subtitle text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mb-12"
          >
            Uma jornada de paixão, precisão e transformações que redefiniram o conceito de beleza natural
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="px-8 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
              asChild
            >
              <a
                href="https://wa.me/5581997147184?text=Olá,%20tudo%20bem?%20👋%0A%0AEstou%20visitando%20seu%20site%20e%20me%20interessei%20por%20um%20serviço.%0AGostaria%20de%20saber%20mais%20informações,%20por%20favor."
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar Consulta
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Introdução */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className={`${cormorantSC.className} text-4xl md:text-5xl font-light mb-8`}>
              <span className="block text-muted-foreground">Do Sonho à</span>
              <span className="block">Realidade</span>
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              <p className={`${montserrat.className} text-lg text-muted-foreground leading-relaxed mb-8`}>
                Tudo começou com uma visão simples mas poderosa: criar um espaço onde a beleza fosse tratada como arte,
                onde cada traço fosse intencional e cada cliente se sentisse verdadeiramente único.
              </p>
              <p className={`${montserrat.className} text-lg text-muted-foreground leading-relaxed`}>
                Hoje, somos referência em design de sobrancelhas e beleza integrada, mas nossa essência permanece a mesma:
                paixão pelo detalhe, respeito pela individualidade e compromisso com a excelência.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Estatísticas */}
      <section ref={statsRef} className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-card border border-border shadow-sm"
              >
                <div className={`${cormorantSC.className} text-3xl md:text-4xl font-bold text-foreground mb-2`}>
                  {stat.number}
                </div>
                <div className={`${montserrat.className} text-sm md:text-base text-muted-foreground font-medium`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`${cormorantSC.className} text-4xl md:text-5xl font-light mb-4`}>
              Nossa Jornada
            </h2>
            <p className={`${montserrat.className} text-muted-foreground max-w-2xl mx-auto`}>
              Cada marco representa um passo em direção à excelência que oferecemos hoje
            </p>
          </motion.div>

          <div className="relative">
            {/* Linha do tempo central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-border via-muted-foreground/30 to-border" />

            {/* Linha do tempo pontos */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-foreground rounded-full top-0" />
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-foreground rounded-full bottom-0" />

            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: item.side === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`timeline-card relative flex ${item.side === "left" ? "flex-row" : "flex-row-reverse"
                  } items-start mb-12 md:mb-16`}
              >
                {/* Conteúdo */}
                <div className={`w-full md:w-5/12 ${item.side === "left" ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-muted">
                        {item.icon}
                      </div>
                      <div>
                        <span className={`${montserrat.className} font-semibold text-foreground`}>
                          {item.year}
                        </span>
                        <span className={`${montserrat.className} text-sm text-muted-foreground ml-2`}>
                          • {item.month}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Ponto na linha do tempo */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-card border-2 border-foreground rounded-full z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-foreground rounded-full" />
                </div>

                {/* Espaço vazio para alinhamento */}
                <div className={`w-full md:w-5/12 ${item.side === "left" ? "md:pl-12" : "md:pr-12"}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filosofia */}
      <section ref={philosophyRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`${cormorantSC.className} text-4xl md:text-5xl font-light mb-4`}>
              Nossa Filosofia
            </h2>
            <p className={`${montserrat.className} text-muted-foreground max-w-2xl mx-auto`}>
              Princípios que guiam cada decisão e cada traço em nosso trabalho
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl border ${principle.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg border border-border mb-4 text-background">
                  {principle.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-background">
                  {principle.title}
                </h3>
                <p className="text-background/90 text-sm">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section ref={teamRef} className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`${cormorantSC.className} text-4xl md:text-5xl font-light mb-4`}>
              Nossa Equipe
            </h2>
            <p className={`${montserrat.className} text-muted-foreground max-w-2xl mx-auto`}>
              Profissionais apaixonados que transformam técnicas em arte e sonhos em realidade
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamData.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="team-member-card group"
              >
                <div className={`relative h-64 rounded-xl overflow-hidden mb-6 bg-gradient-to-br ${member.color} border border-border`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Palette className="w-16 h-16 text-muted-foreground/20" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-foreground">{member.name}</h3>
                <p className={`${montserrat.className} text-muted-foreground text-sm mb-3`}>{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-foreground to-foreground/90 text-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-background/80" />
            <h2 className={`${cormorantSC.className} text-4xl md:text-5xl font-light mb-6`}>
              Faça Parte Desta História
            </h2>
            <p className={`${montserrat.className} text-lg text-background/90 mb-8 max-w-2xl mx-auto`}>
              Sua jornada de transformação começa aqui. Venha escrever seu capítulo com a gente e descubra a beleza que já existe em você.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 bg-background text-foreground hover:bg-background/90 transition-all duration-300 hover:scale-105"
                asChild
              >
                <a
                  href="https://wa.me/5581997147184?text=Olá,%20tudo%20bem?%20👋%0A%0AEstou%20visitando%20seu%20site%20e%20me%20interessei%20por%20um%20serviço.%0AGostaria%20de%20saber%20mais%20informações,%20por%20favor."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar Minha Transformação
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}