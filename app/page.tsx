import Why from '@/components/Why';
import Hero from '@/components/Hero';

const HomePage = () => {
  return (
    <main>

      <Hero numero='001' servico='Sombrancelhas' subtitulo='Feito para o seu olhar' paragrafo='Cada design é mapeado para se ajustar ao formato e à personalidade do seu olhar. O trabalho é feito fio a fio, respeitando seus traços naturais e acompanhando seus movimentos. Seja você fã de um estilo mais delicado ou marcante, o resultado é sempre o mesmo: sobrancelhas que parecem ter nascido com você.' srcImage='/images/pexels-alipazani-2772099.avif'/>

      <Why />

      <Hero numero='002' servico='Maquiagem' subtitulo='Mostre o que você tem de melhor' paragrafo='lorem ipson dolor uialiuia liyavwudva lauyvwd aluyalwdu liyal alyuw whlau  aiy wdlh a aiwyd alyud ia diai kaowvlyw lyapwuday iaiv 9ua duai oua d , liauwd kubaj dajçi f. iaçjaljbf  lalma.açi fboajma~kof, uabiu aobufuuw liayvi' srcImage='/images/pexels-cottonbro-4056467.avif' inverse />

    </main>
  );
};

export default HomePage;
