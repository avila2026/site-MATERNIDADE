/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="bg-[#FFE4E6]">
      {/* Feature Block 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="order-2 lg:order-1 relative h-[500px] lg:h-auto overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&q=80&w=1200" 
             alt="Cuidado com o bebê" 
             className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
           />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-24 bg-[#FFE4E6]">
           <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FDA4AF] mb-6">Nosso Compromisso</span>
           <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#4C0519] leading-tight">
             Segurança e <br/> Conforto.
           </h3>
           <p className="text-lg text-[#881337] font-light leading-relaxed mb-12 max-w-md">
             Rejeitamos o supérfluo. Cada item em nossa curadoria é escolhido por sua qualidade, segurança e funcionalidade, garantindo que você tenha apenas o essencial para cuidar do seu bebê com serenidade.
           </p>
           <a href="#" className="inline-block text-sm font-medium uppercase tracking-widest underline underline-offset-8 hover:text-[#881337] transition-colors">Conheça nossa curadoria</a>
        </div>
      </div>

      {/* Feature Block 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-[#4C0519] text-[#FFF1F2]">
           <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FDA4AF] mb-6">A Jornada</span>
           <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#FFF1F2] leading-tight">
             Amor em cada detalhe.
           </h3>
           <p className="text-lg text-[#FDA4AF] font-light leading-relaxed mb-12 max-w-md">
             Nossa curadoria respeita o seu ritmo. Sem complicações, sem excessos. Apenas o suporte necessário para que você possa focar no que realmente importa: o desenvolvimento e o bem-estar do seu pequeno.
           </p>
        </div>
        <div className="relative h-[500px] lg:h-auto overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&q=80&w=1200" 
             alt="Mãe e bebê" 
             className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] brightness-90"
           />
        </div>
      </div>
    </section>
  );
};

export default Features;
