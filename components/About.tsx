/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-[#E0F2F1]">
      
      {/* Introduction / Story */}
      <div className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-32">
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26] leading-tight">
            Nascido do amor, <br/> construído para o cuidado.
          </h2>
        </div>
        <div className="md:w-2/3 max-w-2xl">
          <p className="text-lg md:text-xl text-[#5D5A53] font-light leading-relaxed mb-8">
            Achadinhos Maternidade foi fundada com um propósito simples: tornar a jornada da maternidade mais leve e acolhedora. Acreditamos que cada detalhe importa na criação de um ambiente seguro e amoroso para o seu bebê.
          </p>
          <p className="text-lg md:text-xl text-[#5D5A53] font-light leading-relaxed mb-8">
            Em uma fase de descobertas intensas, selecionamos produtos que respeitam o seu tempo e o do seu bebê. Usamos materiais seguros, naturais e duráveis—como algodão orgânico e madeira sustentável—criando um refúgio de conforto e tranquilidade para a sua família.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1555487569-dc3da374fab1?auto=format&fit=crop&q=80&w=1000" 
            alt="Maternidade" 
            className="w-full h-[400px] object-cover grayscale contrast-[0.9] brightness-110 mt-12"
          />
          <p className="text-sm font-medium uppercase tracking-widest text-[#A8A29E] mt-4">
            Achadinhos Maternidade, com você.
          </p>
        </div>
      </div>

      {/* Philosophy Blocks (Formerly Features) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="order-2 lg:order-1 relative h-[500px] lg:h-auto overflow-hidden group">
           <img 
             src="https://images.unsplash.com/photo-1519689681393-70e868285a88?auto=format&fit=crop&q=80&w=1200" 
             alt="Algodão Orgânico" 
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
           />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-24 bg-[#B2DFDB]">
           <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5D5A53] mb-6">Cuidado</span>
           <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#2C2A26] leading-tight">
             Produtos feitos para <br/> durar e proteger.
           </h3>
           <p className="text-lg text-[#5D5A53] font-light leading-relaxed mb-12 max-w-md">
             Rejeitamos o supérfluo. Cada item em nossa curadoria é escolhido por sua qualidade, segurança e funcionalidade, garantindo que você tenha apenas o essencial para cuidar do seu bebê com serenidade.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-[#2C2A26] text-[#F5F2EB]">
           <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">A Jornada</span>
           <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#F5F2EB] leading-tight">
             Amor em cada detalhe.
           </h3>
           <p className="text-lg text-[#A8A29E] font-light leading-relaxed mb-12 max-w-md">
             Nossa curadoria respeita o seu ritmo. Sem complicações, sem excessos. Apenas o suporte necessário para que você possa focar no que realmente importa: o desenvolvimento e o bem-estar do seu pequeno.
           </p>
        </div>
        <div className="relative h-[500px] lg:h-auto overflow-hidden group">
           <img 
             src="https://images.unsplash.com/photo-1517646287270-a5a9b6020c65?auto=format&fit=crop&q=80&w=1200" 
             alt="Mãe e bebê" 
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-90"
           />
        </div>
      </div>
    </section>
  );
};

export default About;