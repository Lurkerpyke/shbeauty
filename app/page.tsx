import Why from '@/components/Why';
import Hero from '@/components/Hero';

const HomePage = () => {
  return (
    <main>

      <Hero numero='001' servico='Sombrancelhas' subtitulo='Feito para o seu olhar' paragrafo='Cada design é mapeado para se ajustar ao formato e à personalidade do seu olhar. O trabalho é feito fio a fio, respeitando seus traços naturais e acompanhando seus movimentos. Seja você fã de um estilo mais delicado ou marcante, o resultado é sempre o mesmo: sobrancelhas que parecem ter nascido com você.' srcImage='/images/pexels-alipazani-2772099.avif'/>

      <Why />

      <Hero
        numero="002"
        servico="Maquiagem Profissional"
        subtitulo="Realce sua beleza com técnica e sofisticação"
        paragrafo="Nossa maquiagem profissional é pensada para valorizar seus traços naturais, respeitando seu estilo e a ocasião. Trabalhamos com produtos de alta qualidade, técnicas atualizadas e acabamento impecável, garantindo durabilidade, conforto e um visual elegante. Seja para eventos, ensaios fotográficos, formaturas ou ocasiões especiais, cada detalhe é cuidadosamente planejado para que você se sinta confiante, segura e ainda mais bonita."
        srcImage="/images/pexels-cottonbro-4056467.avif"
        inverse
      />


    </main>
  );
};

export default HomePage;
