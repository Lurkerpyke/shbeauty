export const servicesDetails = {
    "001": {
        title: "Design Simples",
        description:
            "Realce a beleza natural das suas sobrancelhas com um design delicado, preciso e harmonioso. Ideal para quem busca definição sem exageros.",
        image: "https://picsum.photos/600/400?random=1",
        price: "R$ 30,00",
    },
    "002": {
        title: "Design + Renna",
        description:
            "Combine o design de sobrancelhas com a coloração natural da henna. Resultado mais marcante e duradouro para destacar seu olhar.",
        image: "https://picsum.photos/600/400?random=2",
        price: "R$ 45,00",
    },
    "003": {
        title: "Bulço",
        description:
            "Remoção eficaz dos pelos acima dos lábios com total conforto. Pele lisa e aparência impecável em minutos.",
        image: "https://picsum.photos/600/400?random=3",
        price: "R$ 15,00",
    },
    "004": {
        title: "Spa dos Lábios",
        description:
            "Hidratação profunda, esfoliação e revitalização labial. Ideal para lábios ressecados ou antes da maquiagem.",
        image: "https://picsum.photos/600/400?random=4",
        price: "R$ 35,00",
    },
    "005": {
        title: "Maquiagem Social",
        description:
            "Maquiagem elegante e versátil para eventos, festas e ocasiões especiais. Realce sua beleza com sofisticação.",
        image: "https://picsum.photos/600/400?random=5",
        price: "R$ 120,00",
    },
    "006": {
        title: "Maquiagem Beauty",
        description:
            "Técnicas avançadas e produtos de alta performance para criar um visual impactante com acabamento perfeito.",
        image: "https://picsum.photos/600/400?random=6",
        price: "R$ 140,00",
    },
    "007": {
        title: "Reconstrução + Argila",
        description:
            "Tratamento capilar completo com máscara reconstrutora e aplicação de argila branca para nutrição e brilho.",
        image: "https://picsum.photos/600/400?random=7",
        price: "R$ 60,00",
    },
    "008": {
        title: "Brow Lamination",
        description:
            "Alinhamento dos fios da sobrancelha para um efeito lifting natural, proporcionando mais volume e definição.",
        image: "https://picsum.photos/600/400?random=8",
        price: "R$ 90,00",
    },
    "009": {
        title: "Babyliss",
        description:
            "Ondas, cachos ou movimento natural nos fios com babyliss profissional. Finalização perfeita para qualquer ocasião.",
        image: "https://picsum.photos/600/400?random=9",
        price: "R$ 40,00",
    },
    "010": {
        title: "Curso de Automaquiagem",
        description:
            "Aprenda técnicas práticas e personalizadas para realçar sua beleza no dia a dia. Ideal para iniciantes ou quem deseja se aperfeiçoar.",
        image: "https://picsum.photos/600/400?random=10",
        price: "R$ 180,00",
    },
    "011": {
        title: "Maquiagem Artística",
        description:
            "Criações únicas e ousadas para performances, festas temáticas ou projetos especiais. Liberdade total de expressão.",
        image: "https://picsum.photos/600/400?random=11",
        price: "R$ 160,00",
    },
    "012": {
        title: "Maquiagem Infantil",
        description:
            "Colorida, leve e divertida! Maquiagem segura e adaptada para crianças em festas e eventos especiais.",
        image: "https://picsum.photos/600/400?random=11",
        price: "R$ 70,00",
    },
} as const;

export type ServiceId = keyof typeof servicesDetails;
