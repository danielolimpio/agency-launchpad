import heroWorkspace from "@/assets/hero-workspace.webp";
import cardAbstract from "@/assets/card-abstract.jpg";
import cardTools from "@/assets/card-tools.jpg";
import cardManagement from "@/assets/card-management.jpg";
import cardSales from "@/assets/card-sales.jpg";
import cardNiches from "@/assets/card-niches.jpg";
import cardCareer from "@/assets/card-career.jpg";
import cardTech from "@/assets/card-tech.jpg";
import cardFashion from "@/assets/card-fashion.jpg";
import cardContent from "@/assets/card-content.jpg";
import trendingPlanet from "@/assets/trending-planet.jpg";
import editorsMountain from "@/assets/editors-mountain.jpg";
import catPhoto from "@/assets/cat-photo.jpg";
import catLifestyle from "@/assets/cat-lifestyle.jpg";
import catAutumn from "@/assets/cat-autumn.jpg";
import catCabin from "@/assets/cat-cabin.jpg";
import authorAvatar from "@/assets/author-avatar.jpg";

export const images = {
  heroWorkspace,
  cardAbstract,
  cardTools,
  cardManagement,
  cardSales,
  cardNiches,
  cardCareer,
  cardTech,
  cardFashion,
  cardContent,
  trendingPlanet,
  editorsMountain,
  catPhoto,
  catLifestyle,
  catAutumn,
  catCabin,
  authorAvatar,
};

export type BadgeColor = "orange" | "teal" | "pink" | "blue" | "green" | "red";

export const badgeClass: Record<BadgeColor, string> = {
  orange: "bg-[color:var(--badge-orange)]",
  teal: "bg-[color:var(--badge-teal)]",
  pink: "bg-[color:var(--badge-pink)]",
  blue: "bg-[color:var(--badge-blue)]",
  green: "bg-[color:var(--badge-green)]",
  red: "bg-[color:var(--badge-red)]",
};

export type Article = {
  title: string;
  category: string;
  badge: string;
  badgeColor: BadgeColor;
  author: string;
  date: string;
  image: string;
  excerpt?: string;
  readTime?: string;
};

export const hero: Article = {
  title: "Construindo Sua Marca Pessoal Online no Mundo das Agências",
  category: "Carreira",
  badge: "Destaque",
  badgeColor: "teal",
  author: "Ana Ribeiro",
  date: "3 de Junho, 2026",
  image: images.heroWorkspace,
  excerpt:
    "Autoridade é a moeda mais valiosa para donos de agência. Veja como posicionar seu nome antes de vender qualquer serviço.",
  readTime: "8 min",
};

export const dailyDiscoveries: Article[] = [
  {
    title: "Gestão de Tempo Eficaz para Donos de Agência",
    category: "Gestão",
    badge: "Operações",
    badgeColor: "orange",
    author: "Ana Ribeiro",
    date: "1 de Jun, 2026",
    image: images.cardAbstract,
    readTime: "6 min",
  },
  {
    title: "Guia Rápido de Ferramentas de IA para Marketing",
    category: "Ferramentas",
    badge: "SaaS",
    badgeColor: "pink",
    author: "Anna Freitas",
    date: "2 de Jun, 2026",
    image: images.cardTools,
    readTime: "10 min",
  },
  {
    title: "Prospecção Fria: O Roteiro que Fecha Contratos",
    category: "Vendas",
    badge: "Playbook",
    badgeColor: "orange",
    author: "Ana Ribeiro",
    date: "4 de Jun, 2026",
    image: images.cardSales,
    readTime: "7 min",
  },
  {
    title: "Nichos Premium: Onde Cobrar 5x Mais",
    category: "Nichos",
    badge: "Estratégia",
    badgeColor: "teal",
    author: "Anna Freitas",
    date: "5 de Jun, 2026",
    image: images.cardNiches,
    readTime: "9 min",
  },
  {
    title: "Viajando Enquanto Escala: Rotina Remota Enxuta",
    category: "Carreira",
    badge: "Lifestyle",
    badgeColor: "teal",
    author: "Anna Freitas",
    date: "6 de Jun, 2026",
    image: images.cardCareer,
    readTime: "5 min",
  },
];

export const trending: Article[] = [
  {
    title: "Estrutura de Agência do Zero em 90 Dias",
    category: "Gestão",
    badge: "Guia",
    badgeColor: "teal",
    author: "Ana Ribeiro",
    date: "1 de Jun, 2026",
    image: images.trendingPlanet,
    excerpt:
      "Um mapa completo de operações, financeiro e entrega para tirar sua agência do papel sem afogar em caos.",
    readTime: "12 min",
  },
  {
    title: "Construindo um Blog de Autoridade do Zero",
    category: "Carreira",
    badge: "Conteúdo",
    badgeColor: "pink",
    author: "Ana Ribeiro",
    date: "28 de Mai, 2026",
    image: images.cardCareer,
    readTime: "9 min",
  },
  {
    title: "Rotinas de Foco Extremo para Founders Ocupados",
    category: "Gestão",
    badge: "Produtividade",
    badgeColor: "blue",
    author: "Anna Freitas",
    date: "22 de Mai, 2026",
    image: images.cardManagement,
    readTime: "6 min",
  },
  {
    title: "Como Reciclar Leads Frios em Contratos Ativos",
    category: "Vendas",
    badge: "Aquisição",
    badgeColor: "green",
    author: "Ana Ribeiro",
    date: "18 de Mai, 2026",
    image: images.cardSales,
    readTime: "8 min",
  },
  {
    title: "Maximizando Produtividade: 5 Estratégias Simples",
    category: "Gestão",
    badge: "Operações",
    badgeColor: "orange",
    author: "Anna Freitas",
    date: "15 de Mai, 2026",
    image: images.cardAbstract,
    readTime: "5 min",
  },
];

export const editorLarge: Article = {
  title: "Explorando Modelos de Precificação em Agências de Alta Performance",
  category: "Gestão",
  badge: "Editor's Pick",
  badgeColor: "orange",
  author: "Ana Ribeiro",
  date: "10 de Jun, 2026",
  image: images.editorsMountain,
  readTime: "14 min",
};

export const editorSmall: Article[] = [
  {
    title: "Rotinas de Alta Performance para Founders Ocupados",
    category: "Carreira",
    badge: "Lifestyle",
    badgeColor: "teal",
    author: "Anna Freitas",
    date: "8 de Jun, 2026",
    image: images.cardManagement,
  },
  {
    title: "Construindo um Blog de Autoridade do Zero",
    category: "Carreira",
    badge: "Conteúdo",
    badgeColor: "pink",
    author: "Ana Ribeiro",
    date: "5 de Jun, 2026",
    image: images.cardCareer,
  },
  {
    title: "Projetos DIY para Automatizar Sua Operação",
    category: "Ferramentas",
    badge: "Automação",
    badgeColor: "orange",
    author: "Anna Freitas",
    date: "2 de Jun, 2026",
    image: images.cardTools,
  },
  {
    title: "Guia de Reciclagem de Leads Antigos",
    category: "Vendas",
    badge: "Aquisição",
    badgeColor: "green",
    author: "Ana Ribeiro",
    date: "28 de Mai, 2026",
    image: images.cardSales,
  },
];

export const featured: Article[] = [
  {
    title: "Explorando Nichos de Alto Valor no Brasil",
    category: "Nichos",
    badge: "Especialização",
    badgeColor: "teal",
    author: "Ana Ribeiro",
    date: "12 de Jun, 2026",
    image: images.cardNiches,
    excerpt:
      "Um levantamento dos setores que mais pagam por serviços de marketing digital em 2026 e como se posicionar neles.",
    readTime: "11 min",
  },
  {
    title: "Tendências Emergentes de Tecnologia em Marketing",
    category: "Ferramentas",
    badge: "Finanças",
    badgeColor: "blue",
    author: "Kátia Whitaker",
    date: "10 de Jun, 2026",
    image: images.cardTech,
    excerpt:
      "IA generativa, atribuição multi-touch e novos formatos de anúncio. O que sua agência precisa dominar já.",
    readTime: "9 min",
  },
  {
    title: "Branding de Baixo Orçamento: Dicas Trendy",
    category: "Ferramentas",
    badge: "Gadgets",
    badgeColor: "pink",
    author: "Ana Ribeiro",
    date: "8 de Jun, 2026",
    image: images.cardFashion,
    excerpt:
      "Como construir uma identidade visual premium para sua agência com ferramentas gratuitas e um bom olhar.",
    readTime: "7 min",
  },
];

export const categories = [
  { name: "Ferramentas", count: 12, image: images.cardTools, slug: "ferramentas" },
  { name: "Gestão", count: 9, image: images.cardManagement, slug: "gestao" },
  { name: "Vendas", count: 11, image: images.cardSales, slug: "vendas" },
  { name: "Nichos", count: 8, image: images.cardNiches, slug: "nichos" },
  { name: "Carreira", count: 7, image: images.cardCareer, slug: "carreira" },
  { name: "Conteúdo", count: 6, image: images.cardContent, slug: "conteudo" },
];

export const buzz: Article[] = [
  {
    title: "Explorando Nichos Locais Rentáveis",
    category: "Nichos",
    badge: "Photo",
    badgeColor: "teal",
    author: "Ana Ribeiro",
    date: "1 de Jun, 2026",
    image: images.catLifestyle,
  },
  {
    title: "Rotinas Saudáveis para Founders Enxutos",
    category: "Carreira",
    badge: "Lifestyle",
    badgeColor: "orange",
    author: "Anna Freitas",
    date: "2 de Jun, 2026",
    image: images.cardManagement,
  },
  {
    title: "Guia de Copywriting para Landing Pages",
    category: "Ferramentas",
    badge: "Abstract",
    badgeColor: "pink",
    author: "Ana Ribeiro",
    date: "3 de Jun, 2026",
    image: images.cardTools,
  },
  {
    title: "Cultivando Autoridade em Redes Sociais",
    category: "Carreira",
    badge: "Travel",
    badgeColor: "teal",
    author: "Anna Freitas",
    date: "4 de Jun, 2026",
    image: images.cardContent,
  },
  {
    title: "Sua Marca Pessoal Como Máquina de Vendas",
    category: "Carreira",
    badge: "Fashion",
    badgeColor: "pink",
    author: "Ana Ribeiro",
    date: "5 de Jun, 2026",
    image: images.cardFashion,
  },
  {
    title: "5 Estratégias de Produtividade que Funcionam",
    category: "Gestão",
    badge: "Abstract",
    badgeColor: "orange",
    author: "Anna Freitas",
    date: "6 de Jun, 2026",
    image: images.cardAbstract,
  },
  {
    title: "Gerenciando Times Remotos de Alta Performance",
    category: "Gestão",
    badge: "Photo",
    badgeColor: "blue",
    author: "Ana Ribeiro",
    date: "7 de Jun, 2026",
    image: images.cardManagement,
  },
  {
    title: "Construindo um Blog que Gera Contratos",
    category: "Carreira",
    badge: "Fashion",
    badgeColor: "teal",
    author: "Anna Freitas",
    date: "8 de Jun, 2026",
    image: images.cardCareer,
  },
];

export const menu = [
  { title: "FERRAMENTAS", subtitle: "SaaS e IA para Marketing" },
  { title: "GESTÃO", subtitle: "Operações da Agência" },
  { title: "VENDAS", subtitle: "Aquisição de Clientes" },
  { title: "NICHOS", subtitle: "Especialização de Alto Valor" },
  { title: "CARREIRA", subtitle: "Educação e Mercado" },
];
