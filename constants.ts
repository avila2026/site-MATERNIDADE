/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Berço Conforto',
    tagline: 'Sono tranquilo.',
    description: 'Um berço ergonômico feito de madeira sustentável, projetado para o conforto do seu bebê.',
    longDescription: 'O Berço Conforto combina design minimalista com a máxima segurança. Feito de madeira certificada, possui bordas arredondadas e acabamento atóxico, garantindo um ambiente seguro e acolhedor para as noites de sono do seu pequeno.',
    price: 899,
    category: 'Quarto',
    imageUrl: 'https://images.unsplash.com/photo-1555487569-dc3da374fab1?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1555487569-dc3da374fab1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1596464716127-f2a898a9de86?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Madeira Sustentável', 'Acabamento Atóxico', 'Design Ergonômico']
  },
  {
    id: 'p2',
    name: 'Body Algodão Orgânico',
    tagline: 'Suavidade para a pele.',
    description: 'Conjunto de bodies feitos de 100% algodão orgânico, ultra macios e respiráveis.',
    longDescription: 'A pele do bebê é delicada e merece o melhor. Nossos bodies são confeccionados em algodão orgânico certificado, livre de químicos nocivos, proporcionando um toque suave e respirável que mantém o bebê confortável durante todo o dia.',
    price: 89,
    category: 'Vestuário',
    imageUrl: 'https://images.unsplash.com/photo-1519689681393-70e868285a88?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1519689681393-70e868285a88?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1522778119026-d06950242151?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['100% Algodão Orgânico', 'Hipoalergênico', 'Fácil de Vestir']
  },
  {
    id: 'p3',
    name: 'Carrinho Passeio Leve',
    tagline: 'Praticidade em movimento.',
    description: 'Carrinho compacto e leve, ideal para passeios urbanos com seu bebê.',
    longDescription: 'O Carrinho Passeio Leve foi desenhado para pais ativos. Com fechamento compacto e estrutura ultraleve, é fácil de manobrar e transportar, sem abrir mão do conforto e segurança que seu bebê precisa durante os passeios.',
    price: 1299,
    category: 'Passeio',
    imageUrl: 'https://images.unsplash.com/photo-1517646287270-a5a9b6020c65?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1517646287270-a5a9b6020c65?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Fechamento Compacto', 'Ultraleve', 'Segurança Reforçada']
  },
  {
    id: 'p4',
    name: 'Kit Higiene Natural',
    tagline: 'Cuidado delicado.',
    description: 'Produtos de higiene formulados com ingredientes naturais para a pele do bebê.',
    longDescription: 'Cuidar do bebê exige produtos suaves. Nosso Kit Higiene Natural inclui shampoo, sabonete e loção, todos formulados com ingredientes naturais e extratos botânicos, garantindo uma limpeza delicada e hidratação profunda.',
    price: 149,
    category: 'Higiene',
    imageUrl: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1585672307850-553646c63ae1?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Ingredientes Naturais', 'Sem Parabenos', 'Dermatologicamente Testado']
  },
  {
    id: 'p5',
    name: 'Manta de Tricô',
    tagline: 'Aconchego eterno.',
    description: 'Manta de tricô macia, perfeita para envolver o bebê com carinho.',
    longDescription: 'Nada supera o aconchego de uma manta de tricô bem feita. Nossa manta é produzida com fios macios e duráveis, ideal para manter o bebê aquecido e confortável em qualquer ocasião.',
    price: 120,
    category: 'Acessórios',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120f0?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1595428774223-ef52624120f0?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Tricô Macio', 'Durável', 'Versátil']
  },
  {
    id: 'p6',
    name: 'Brinquedo Educativo',
    tagline: 'Aprender brincando.',
    description: 'Brinquedo de madeira seguro que estimula o desenvolvimento motor e cognitivo.',
    longDescription: 'O desenvolvimento do bebê é uma jornada incrível. Nosso Brinquedo Educativo de madeira estimula a curiosidade, a coordenação motora fina e a percepção sensorial, tudo de forma segura e divertida.',
    price: 75,
    category: 'Brinquedos',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Estimula o Desenvolvimento', 'Madeira Segura', 'Design Criativo']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 1,
        title: "A Psicologia da Textura",
        date: "12 de abril de 2025",
        excerpt: "Por que nossas pontas dos dedos anseiam por superfícies naturais em um mundo de vidro e plástico.",
        image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left text-[#5D5A53]" },
                "Vivemos em um mundo sem atrito. Nossos telefones são de vidro liso, nossos laptops de alumínio polido, nossas bancadas de quartzo projetado. Não há resistência, não há granulação, não há textura. E, no entanto, nossa biologia anseia por isso."
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "As pontas dos dedos estão entre as partes mais densamente inervadas do corpo humano. Elas foram projetadas para ler a história de um objeto — sua idade, sua origem, sua temperatura. Quando negamos a elas essa entrada, experimentamos uma forma sutil de privação sensorial."
            ),
            React.createElement("blockquote", { className: "border-l-2 border-[#2C2A26] pl-6 italic text-xl text-[#2C2A26] my-10 font-serif" },
                "\"Tocar é conhecer. Sentir é estar aterrado.\""
            ),
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "Na Achadinhos Maternidade, projetamos tanto para a mão quanto para o olho. Escolhemos materiais que têm voz. Arenito que aquece sob a palma da mão. Tecido que tem uma trama que você pode rastrear. Madeira que lembra a floresta."
            )
        )
    },
    {
        id: 2,
        title: "Viver com Menos",
        date: "28 de março de 2025",
        excerpt: "Uma conversa com o arquiteto Hiroshi Nakamura sobre a arte do espaço vazio.",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "O vazio não é nada. Na arquitetura japonesa, o conceito de ",
                React.createElement("em", null, "Ma"),
                " refere-se ao espaço entre as coisas — a pausa que dá forma ao todo."
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "\"Tendemos a encher nossas vidas com ruído\", diz Nakamura, tomando chá em seu estúdio com vista para as ruas chuvosas de Quioto. \"Compramos mais dispositivos para economizar tempo, mas acabamos com menos tempo do que nunca. O verdadeiro luxo é a ausência de intrusão.\""
            ),
            React.createElement("div", { className: "my-12 p-8 bg-[#EBE7DE] font-serif text-[#2C2A26] italic text-center" },
                React.createElement("p", null, "O quarto está vazio"),
                React.createElement("p", null, "Mas cheio de luz."),
                React.createElement("p", null, "A mente está quieta"),
                React.createElement("p", null, "Mas cheia de pensamentos."),
                React.createElement("p", null, "Este é o peso"),
                React.createElement("p", null, "De viver com menos.")
            ),
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "Esta filosofia impulsiona cada curva da nossa nova coleção. Perguntamos a nós mesmos: o que podemos remover? Quanto podemos tirar até que apenas o essencial permaneça?"
            )
        )
    },
    {
        id: 3,
        title: "Moodboard de Primavera",
        date: "15 de março de 2025",
        excerpt: "Notas do estúdio de design: névoa matinal, pedra úmida e linho pálido.",
        image: "https://images.unsplash.com/photo-1516834474-48c0abc2a902?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "A primavera no estúdio é um momento de despertar. A luz muda dos ângulos baixos e severos do inverno para um brilho mais suave e difuso. Sentimo-nos atraídos por tons mais pálidos — o cinza do pavimento úmido, o creme do linho não branqueado, o verde empoeirado da sálvia."
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "Nosso moodboard deste mês é um estudo sobre suavidade. Trata-se do estado de transição — nem frio nem quente, nem escuro nem brilhante. É o amanhecer do ano."
            ),
             React.createElement("div", { className: "my-12 p-8 bg-[#2C2A26] text-[#F5F2EB] font-serif italic text-center" },
                React.createElement("p", null, "Brotos verdes surgindo"),
                React.createElement("p", null, "Pedra cinza fria contra a pele"),
                React.createElement("p", null, "O sol aquece o ar.")
            )
        )
    }
];

export const BRAND_NAME = 'Achadinhos Maternidade';
export const PRIMARY_COLOR = 'stone-900'; 
export const ACCENT_COLOR = 'stone-500';