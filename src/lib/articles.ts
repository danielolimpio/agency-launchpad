import { images, type BadgeColor } from "@/lib/blog-data";

export type ArticleBlock =
  | { type: "p"; html: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; variant: "tip" | "warning" | "insight"; title: string; body: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "checklist"; items: string[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "steps"; items: { title: string; body: string }[] }
  | { type: "divider" }
  | { type: "cta"; title: string; body: string; label: string; href: string };

export type FullArticle = {
  slug: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  badge: string;
  badgeColor: BadgeColor;
  author: string;
  authorBio: string;
  date: string; // pretty PT-BR
  dateISO: string; // 2026-07-20
  readTime: string;
  image: string;
  imageAlt: string;
  tldr: string[];
  blocks: ArticleBlock[];
  faq: { q: string; a: string }[];
  internalLinks: { title: string; slug: string }[];
  externalLinks: { title: string; url: string; source: string }[];
};

const AUTHOR_ANA = {
  name: "Ana Ribeiro",
  bio: "Consultora de agências há 11 anos. Já ajudou mais de 240 founders brasileiros a estruturar operações lucrativas e previsíveis.",
};
const AUTHOR_ANNA = {
  name: "Anna Freitas",
  bio: "Especialista em aquisição de clientes e prospecção outbound para agências de marketing no Brasil e em Portugal.",
};
const AUTHOR_KATIA = {
  name: "Kátia Whitaker",
  bio: "Analista de tecnologia e produto. Escreve sobre stacks de marketing, automação e IA aplicada a serviços.",
};

export const articles: FullArticle[] = [
  {
    slug: "como-abrir-agencia-de-marketing-digital-em-2026",
    title: "Como Abrir uma Agência de Marketing Digital em 2026: Guia Completo do Zero ao Primeiro Contrato",
    subtitle:
      "Um passo a passo real para quem quer sair do zero, evitar os erros mais comuns e fechar o primeiro cliente em até 60 dias.",
    metaDescription:
      "Guia definitivo para abrir uma agência de marketing digital em 2026. Estrutura jurídica, nicho, precificação, portfólio e aquisição dos primeiros clientes.",
    keywords: [
      "como abrir agência de marketing",
      "abrir agência digital 2026",
      "agência de marketing do zero",
      "primeiro cliente agência",
    ],
    category: "Gestão",
    badge: "Guia Completo",
    badgeColor: "teal",
    author: AUTHOR_ANA.name,
    authorBio: AUTHOR_ANA.bio,
    date: "20 de Julho, 2026",
    dateISO: "2026-07-20",
    readTime: "12 min",
    image: images.editorsMountain,
    imageAlt: "Founder de agência de marketing digital planejando estratégia em workspace moderno",
    tldr: [
      "Escolha um nicho antes de escolher um nome de agência.",
      "MEI serve para começar; troque para LTDA quando cruzar R$ 20 mil/mês.",
      "Precifique por resultado, nunca por hora — a hora esconde seu valor real.",
      "Foco absoluto nos primeiros 10 clientes: eles definem sua reputação nos próximos 3 anos.",
    ],
    blocks: [
      {
        type: "p",
        html: "Todo mês eu recebo mensagens de pessoas que pediram demissão na sexta-feira e querem abrir uma agência de marketing na segunda. A vontade é boa, o timing quase sempre é péssimo. Este guia é o que eu gostaria de ter lido quando abri a minha primeira agência, em 2015, com um notebook velho e uma planilha bagunçada de leads.",
      },
      {
        type: "p",
        html: "Em 2026, abrir uma agência de marketing digital ficou mais fácil do ponto de vista técnico — as ferramentas custam pouco, existe IA para quase tudo e o cliente já entende o que é tráfego pago. Ao mesmo tempo, ficou mais difícil se destacar. É por isso que a diferença entre uma agência que quebra em 8 meses e uma que fatura R$ 100 mil por mês está menos em ferramenta e muito mais em posicionamento.",
      },
      { type: "h2", text: "Quanto custa abrir uma agência de marketing digital em 2026", id: "custo" },
      {
        type: "p",
        html: "Vou ser direta: você não precisa de investimento inicial alto. O que você precisa é de tempo, uma escrivaninha decente e disciplina para tratar o negócio como negócio desde o primeiro dia. Abaixo, um custo realista para os primeiros 90 dias operando em casa.",
      },
      {
        type: "stats",
        items: [
          { value: "R$ 450", label: "Abertura de MEI ou taxas iniciais" },
          { value: "R$ 320/mês", label: "Stack de ferramentas essencial" },
          { value: "R$ 0", label: "Site institucional (Notion, Framer free, Carrd)" },
          { value: "R$ 1.500", label: "Reserva de capital de giro sugerida" },
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Regra da fome saudável",
        body:
          "Nunca invista mais do que você aguenta perder nos primeiros 6 meses. Agência é serviço, e serviço se paga com cliente, não com investimento externo. Se você precisa de aporte para abrir, você não está pronto para abrir.",
      },
      { type: "h2", text: "Escolhendo o nicho antes de escolher o nome", id: "nicho" },
      {
        type: "p",
        html: "A maior parte das agências que fracassa não morre por falta de talento — morre por excesso de abrangência. Quando você diz que atende \"pequenas e médias empresas\", você está dizendo que atende ninguém. Um nicho bem escolhido resolve três problemas ao mesmo tempo: prospecção fica óbvia, portfólio se acumula rápido e o preço médio sobe naturalmente.",
      },
      {
        type: "h3",
        text: "Como testar um nicho em 7 dias",
      },
      {
        type: "steps",
        items: [
          {
            title: "1. Liste 20 empresas do nicho no Google Maps",
            body: "Se você não consegue listar 20 em uma cidade média, o nicho é pequeno demais ou geograficamente inviável.",
          },
          {
            title: "2. Analise o Instagram e o site de todas",
            body: "Anote em uma planilha quantas têm site profissional, quantas rodam anúncios, quantas postam com regularidade. Essa é sua matéria-prima.",
          },
          {
            title: "3. Envie 10 mensagens iniciais de diagnóstico",
            body: "Sem vender. Só perguntando como elas hoje conseguem clientes. Se pelo menos 3 respondem, o nicho tem abertura.",
          },
          {
            title: "4. Faça 3 diagnósticos gratuitos",
            body: "Sem contrato, sem promessa. Só um Loom de 8 minutos apontando o que dá para melhorar. É aqui que você descobre se resolve o problema deles com facilidade.",
          },
        ],
      },
      {
        type: "quote",
        text: "Nicho não é limitação, é foco. Você não vira especialista servindo todo mundo mal — você vira especialista servindo poucos muito bem.",
        cite: "Ana Ribeiro",
      },
      { type: "h2", text: "Estrutura jurídica: MEI, LTDA ou Simples Nacional?", id: "juridico" },
      {
        type: "p",
        html: "Começa como MEI. Ponto. O limite atual de faturamento (R$ 81 mil/ano) cobre confortavelmente os primeiros 8 a 12 meses de qualquer agência bem estruturada. Quando você começar a bater o teto, migre para LTDA no Simples Nacional. O erro comum é abrir LTDA cedo demais, torrar R$ 3 mil em contador antes do primeiro cliente e desanimar com boletos.",
      },
      {
        type: "list",
        items: [
          "Até R$ 6 mil/mês: MEI resolve com folga.",
          "Entre R$ 6 mil e R$ 20 mil/mês: comece a conversar com um contador para migração.",
          "Acima de R$ 20 mil/mês: migração para LTDA é praticamente obrigatória, principalmente se você tem sócio.",
        ],
      },
      { type: "h2", text: "Definindo os serviços iniciais (menos é mais)", id: "servicos" },
      {
        type: "p",
        html: "Você não precisa oferecer tráfego pago, social media, SEO, e-mail marketing e criação de site. Você precisa de um serviço que resolve um problema doloroso e recorrente. Nos primeiros 12 meses, o ideal é ter um serviço principal e, no máximo, dois complementares. Isso reduz atrito comercial e permite padronizar a entrega.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "A regra 1-2-1",
        body:
          "Uma proposta principal, dois add-ons opcionais, um contrato mínimo de 3 meses. Essa estrutura elimina 80% das negociações difíceis e protege seu fluxo de caixa desde o começo.",
      },
      { type: "h2", text: "Precificação: pare de vender hora, comece a vender resultado", id: "precificacao" },
      {
        type: "p",
        html: "Cobrar por hora é a forma mais rápida de virar refém do próprio negócio. Você fica com teto de faturamento, o cliente questiona cada minuto e você é penalizado por ser rápido. A saída é precificar por escopo e resultado — o cliente paga pelo problema resolvido, não pelo tempo que você levou.",
      },
      {
        type: "h3",
        text: "Modelo de fee mensal (o mais recomendado)",
      },
      {
        type: "p",
        html: "Estabeleça um fee mensal fixo cobrindo entrega padronizada + reuniões previstas + relatório. Esse é o núcleo. Em cima disso, ofereça bonificações por meta (comissão sobre vendas geradas ou ROAS acima de X). Fee alto e previsível protege sua operação; bônus por meta acelera seu upside.",
      },
      {
        type: "stats",
        items: [
          { value: "R$ 2.500", label: "Fee mínimo saudável para agência iniciante" },
          { value: "3 meses", label: "Prazo mínimo de contrato inicial" },
          { value: "70/30", label: "Fee fixo vs. variável por meta" },
          { value: "48h", label: "SLA de resposta em dias úteis" },
        ],
      },
      { type: "h2", text: "Portfólio zero? Faça um MVP de reputação", id: "portfolio" },
      {
        type: "p",
        html: "A pergunta \"como conseguir cliente sem portfólio\" é a mais frequente. Minha resposta favorita: crie o portfólio antes do cliente. Escolha 2 negócios reais (podem ser do seu próprio bairro), ofereça 30 dias de trabalho grátis em troca de acesso aos dados e permissão para publicar os resultados. Isso é o seu MVP de reputação.",
      },
      {
        type: "checklist",
        items: [
          "Contrato simples de projeto experimental (sim, mesmo se for grátis).",
          "KPI claro assinado antes de começar (leads, faturamento, custo por venda).",
          "Print de antes e depois com autorização por escrito.",
          "Depoimento em vídeo de 60 segundos ao fim do período.",
        ],
      },
      { type: "h2", text: "Como fechar o primeiro contrato pago", id: "primeiro-cliente" },
      {
        type: "p",
        html: "Existem quatro caminhos que realmente funcionam para os primeiros 10 clientes: rede pessoal, prospecção fria estruturada, conteúdo de autoridade e parcerias com nichos complementares. Escolha dois, ignore os outros por 90 dias. Tentar todos ao mesmo tempo é sinônimo de nenhum dar certo.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Rede pessoal (semana 1)",
            body: "Liste 40 pessoas do seu WhatsApp que têm negócio ou trabalham em cargo de decisão. Envie uma mensagem simples anunciando o que você faz e para quem.",
          },
          {
            title: "Prospecção outbound (semana 2 a 12)",
            body: "20 mensagens personalizadas por dia útil no LinkedIn ou Instagram, sempre com um diagnóstico rápido do negócio. Sem copiar e colar.",
          },
          {
            title: "Conteúdo de autoridade (contínuo)",
            body: "3 posts semanais mostrando bastidor de projetos, sempre com foco no nicho escolhido. Nada de post genérico de marketing.",
          },
          {
            title: "Parcerias (mês 2 em diante)",
            body: "Feche 3 parcerias com prestadores que atendem seu nicho mas não competem com você (contador, designer, dev). Comissão de 10% em cada indicação convertida.",
          },
        ],
      },
      { type: "h2", text: "Erros que quebram agências antes do 6º mês", id: "erros" },
      {
        type: "list",
        items: [
          "Aceitar qualquer cliente para bater meta de faturamento no mês.",
          "Contratar time antes de ter margem consistente por 6 meses.",
          "Trocar de nicho a cada trimestre por ansiedade.",
          "Ignorar contrato porque \"o cliente é amigo\".",
          "Comprar curso caro no lugar de fazer prospecção real.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Alerta de fluxo de caixa",
        body:
          "Guarde no mínimo 3 meses de custo fixo em conta separada antes de considerar qualquer contratação. Agência quebra por caixa, não por falta de cliente.",
      },
      {
        type: "cta",
        title: "Próximo passo prático",
        body:
          "Se você chegou até aqui, o próximo movimento é o mais simples: escolher o nicho e listar as 20 empresas. Reserve 2 horas hoje e faça essa lista. Sem lista, o resto é teoria.",
        label: "Ver playbook de prospecção",
        href: "/artigos/prospeccao-fria-para-agencias-de-marketing",
      },
    ],
    faq: [
      {
        q: "Preciso ter formação em marketing para abrir uma agência?",
        a: "Não. Mais importante que diploma é ter resultado comprovado em pelo menos um canal. A maioria dos donos de agência que conheço aprendeu na prática, atendendo o próprio negócio antes de vender para terceiros.",
      },
      {
        q: "Qual o faturamento realista nos primeiros 12 meses?",
        a: "Com foco em nicho e 4h/dia dedicadas a prospecção, é razoável mirar entre R$ 8 mil e R$ 20 mil de MRR no final do primeiro ano. Abaixo disso, revise nicho ou proposta de valor.",
      },
      {
        q: "Devo abrir sozinho ou com sócio?",
        a: "Sócio só se ele agrega uma competência que você não tem e assume risco financeiro igual ao seu. Sócio por amizade ou insegurança é o motivo número 1 de brigas societárias em agências brasileiras.",
      },
      {
        q: "Preciso de CNPJ para começar a atender?",
        a: "Para os primeiros diagnósticos gratuitos, não. Para emitir a primeira nota fiscal, sim. Abra MEI antes do primeiro contrato pago para evitar dor de cabeça tributária.",
      },
    ],
    internalLinks: [
      { title: "Prospecção Fria: O Roteiro que Fecha Contratos", slug: "prospeccao-fria-para-agencias-de-marketing" },
      { title: "Nichos Premium: Onde Cobrar 5x Mais", slug: "nichos-premium-para-agencias-em-2026" },
      { title: "Ferramentas de IA para Agências de Marketing", slug: "ferramentas-de-ia-para-agencias-de-marketing" },
    ],
    externalLinks: [
      { title: "Portal do Empreendedor (MEI)", url: "https://www.gov.br/empresas-e-negocios/pt-br/empreendedor", source: "gov.br" },
      { title: "Simples Nacional — Receita Federal", url: "https://www8.receita.fazenda.gov.br/SimplesNacional/", source: "Receita Federal" },
      { title: "Sebrae — Como abrir uma agência", url: "https://sebrae.com.br/", source: "Sebrae" },
    ],
  },

  {
    slug: "prospeccao-fria-para-agencias-de-marketing",
    title: "Prospecção Fria para Agências: O Roteiro Prático que Fechou R$ 480 mil em 12 Meses",
    subtitle:
      "Método outbound testado com mais de 40 agências brasileiras. Sem gatilho manjado, sem script robótico, sem promessa milagrosa.",
    metaDescription:
      "Passo a passo de prospecção fria para agências de marketing. Roteiros de mensagem, cadência, follow-up e métricas para transformar cold outreach em contratos.",
    keywords: ["prospecção fria agência", "cold outreach marketing", "outbound b2b agência", "script prospecção linkedin"],
    category: "Vendas",
    badge: "Playbook",
    badgeColor: "orange",
    author: AUTHOR_ANNA.name,
    authorBio: AUTHOR_ANNA.bio,
    date: "20 de Julho, 2026",
    dateISO: "2026-07-20",
    readTime: "11 min",
    image: images.cardSales,
    imageAlt: "Mesa de trabalho com laptop, notebook e xícara de café durante sessão de prospecção outbound",
    tldr: [
      "Prospecção fria funciona quando o volume é baixo e a personalização é alta.",
      "Cadência ideal: 5 toques em 14 dias por múltiplos canais.",
      "Meta realista: 2% de reunião marcada em cold outreach bem feito.",
      "Nunca comece a mensagem falando de você.",
    ],
    blocks: [
      {
        type: "p",
        html: "Prospecção fria está morta — dizem os mesmos que nunca fizeram prospecção fria direito. A verdade é que outbound é o canal mais previsível para uma agência iniciante ou intermediária. Ele não depende de algoritmo, não precisa de verba de mídia e permite ajuste rápido de mensagem conforme o mercado responde.",
      },
      {
        type: "p",
        html: "Neste playbook, eu abro o processo que apliquei em 40+ agências entre 2024 e 2026. É o mesmo método que gerou R$ 480 mil em contratos fechados para uma agência de tráfego com apenas 2 pessoas na operação. Não tem mágica, tem rotina.",
      },
      { type: "h2", text: "Por que a maioria das agências fracassa em outbound", id: "por-que-falha" },
      {
        type: "list",
        items: [
          "Manda 300 mensagens iguais por dia esperando resposta.",
          "Começa falando \"tudo bem?\" e emenda um pitch de 4 parágrafos.",
          "Não faz follow-up (75% das reuniões vem do 3º toque em diante).",
          "Prospecta em nicho errado (dono não decide, ticket baixo, ciclo longo demais).",
          "Trata a métrica como resposta positiva, não como reunião realizada.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Automação sem contexto queima lista",
        body:
          "Ferramentas de disparo em massa no LinkedIn e Instagram levam à suspensão de conta e queima da lista. Prospecção fria séria trabalha com volume baixo e personalização real, mesmo em 2026.",
      },
      { type: "h2", text: "A estrutura de mensagem que funciona", id: "estrutura-mensagem" },
      {
        type: "p",
        html: "Toda mensagem de prospecção precisa passar em 3 testes antes de ser enviada: relevância (por que essa pessoa e não outra), especificidade (por que agora e não em outro momento) e leveza (dá para ler em 15 segundos no celular). Se falha em um, a taxa de resposta desaba.",
      },
      {
        type: "steps",
        items: [
          {
            title: "1. Gancho pessoal (1 linha)",
            body: "Mostre que você olhou o negócio da pessoa. Cite algo concreto: um lançamento recente, um post, uma mudança no site.",
          },
          {
            title: "2. Observação de valor (2 linhas)",
            body: "Aponte algo que dá para melhorar, sem parecer que está corrigindo. Foco em oportunidade, não em erro.",
          },
          {
            title: "3. Pergunta aberta (1 linha)",
            body: "Faça uma pergunta que dá para responder em 30 segundos. Nunca convide para reunião no primeiro toque.",
          },
        ],
      },
      {
        type: "quote",
        text: "A primeira mensagem serve para ganhar o direito de mandar a segunda. Só isso.",
        cite: "Anna Freitas",
      },
      { type: "h2", text: "Cadência de 14 dias (5 toques)", id: "cadencia" },
      {
        type: "steps",
        items: [
          { title: "Dia 1 — Toque frio", body: "Mensagem principal no canal onde a pessoa é mais ativa (LinkedIn, Instagram ou e-mail)." },
          { title: "Dia 3 — Complemento de valor", body: "Envie um material curto: um Loom de 3 min, um print, um insight relevante. Sem pedir nada." },
          { title: "Dia 6 — Prova social", body: "Cite brevemente um caso parecido que você resolveu. Máximo 3 linhas." },
          { title: "Dia 10 — Pergunta direta", body: "\"Faz sentido a gente conversar 15 minutos essa semana ou é melhor eu voltar no próximo trimestre?\"" },
          { title: "Dia 14 — Break-up", body: "Mensagem final educada assumindo que não é prioridade. Costuma gerar 15% das respostas." },
        ],
      },
      { type: "h2", text: "Métricas honestas de outbound", id: "metricas" },
      {
        type: "stats",
        items: [
          { value: "8-12%", label: "Taxa de resposta em cold outreach bem feito" },
          { value: "20-25%", label: "Conversão de resposta em reunião marcada" },
          { value: "30-40%", label: "Conversão de reunião em proposta enviada" },
          { value: "25-35%", label: "Fechamento de proposta enviada" },
        ],
      },
      {
        type: "callout",
        variant: "insight",
        title: "Matemática realista",
        body:
          "Para 4 novos clientes/mês, precisa de aproximadamente 500 prospects tocados. Isso equivale a 25 prospects/dia útil trabalhando em cadência bem feita. É factível para uma pessoa dedicando 2h/dia.",
      },
      { type: "h2", text: "Como construir a lista (sem comprar base)", id: "lista" },
      {
        type: "p",
        html: "Lista comprada é veneno lento. Ela pode até gerar reunião no primeiro mês, mas destrói reputação de domínio, entope filtro de spam e não filtra por decisor. Construa a lista à mão, mesmo que leve 4 horas por semana. Uma lista de 300 nomes bem qualificada rende mais que 3 mil comprados.",
      },
      {
        type: "checklist",
        items: [
          "Filtre por cargo (dono, sócio, diretor de marketing).",
          "Filtre por tamanho (evite empresa com menos de 8 funcionários e mais de 200).",
          "Filtre por sinal recente (contratação, mudança de site, novo produto).",
          "Anote 1 observação real por prospect antes de enviar mensagem.",
        ],
      },
      { type: "h2", text: "O follow-up é onde o dinheiro mora", id: "follow-up" },
      {
        type: "p",
        html: "Estudos internos que rodei em 2025 mostram que 68% das reuniões marcadas em outbound vieram do 3º toque em diante. A pessoa não respondeu na primeira mensagem porque estava ocupada, não porque não tem interesse. Follow-up bem escrito é o que separa quem prospecta de quem vende.",
      },
      {
        type: "cta",
        title: "Complemento estratégico",
        body:
          "Antes de escalar prospecção, garanta que o nicho está certo. Um bom outbound em nicho ruim é apenas ruído mais rápido.",
        label: "Ler: Nichos Premium",
        href: "/artigos/nichos-premium-para-agencias-em-2026",
      },
    ],
    faq: [
      {
        q: "LinkedIn ou Instagram é melhor para prospecção B2B?",
        a: "Depende do nicho. Para SaaS, indústria e B2B tradicional, LinkedIn. Para varejo, e-commerce e prestadores de serviço local, Instagram converte mais. Teste com 50 prospects em cada antes de decidir.",
      },
      {
        q: "Posso usar automação no LinkedIn em 2026?",
        a: "A política do LinkedIn é clara: automação de terceiros é motivo para banimento. O jogo hoje é volume baixo com mão humana. Ferramentas de organização (CRM, lembretes) são bem-vindas; ferramentas de disparo automático, não.",
      },
      {
        q: "Qual a diferença entre prospecção fria e spam?",
        a: "Relevância. Se a pessoa lê e pensa \"faz sentido esse contato\", é prospecção. Se ela pensa \"nem me conhece e já quer vender\", é spam. A linha é a personalização real.",
      },
    ],
    internalLinks: [
      { title: "Como Abrir uma Agência de Marketing em 2026", slug: "como-abrir-agencia-de-marketing-digital-em-2026" },
      { title: "Nichos Premium: Onde Cobrar 5x Mais", slug: "nichos-premium-para-agencias-em-2026" },
      { title: "Precificação Estratégica para Agências", slug: "precificacao-estrategica-para-agencias" },
    ],
    externalLinks: [
      { title: "Políticas de uso do LinkedIn", url: "https://www.linkedin.com/legal/user-agreement", source: "LinkedIn" },
      { title: "LGPD — Guia oficial", url: "https://www.gov.br/anpd/pt-br", source: "ANPD" },
    ],
  },

  {
    slug: "nichos-premium-para-agencias-em-2026",
    title: "Nichos Premium para Agências em 2026: Onde Cobrar 5x Mais Fazendo Menos Volume",
    subtitle:
      "Um mapa de 9 nichos que combinam alto ticket, dor recorrente e concorrência baixa no mercado brasileiro.",
    metaDescription:
      "Descubra os nichos mais lucrativos para agências de marketing em 2026. Ticket médio, dores comuns, canais de aquisição e como se posicionar em cada um.",
    keywords: ["nichos para agência", "agência de nicho", "nichos lucrativos marketing", "high ticket agência"],
    category: "Nichos",
    badge: "Estratégia",
    badgeColor: "teal",
    author: AUTHOR_ANA.name,
    authorBio: AUTHOR_ANA.bio,
    date: "20 de Julho, 2026",
    dateISO: "2026-07-20",
    readTime: "10 min",
    image: images.cardNiches,
    imageAlt: "Analista revisando dashboard com métricas de nichos de mercado em tela grande",
    tldr: [
      "Nicho premium tem ticket alto, dor clara e ciclo de venda médio.",
      "Fuja de nichos com margem apertada, mesmo que o volume seja grande.",
      "Especialização real leva 6-9 meses de posicionamento consistente.",
      "Um único caso de sucesso em nicho fechado abre 5 portas.",
    ],
    blocks: [
      {
        type: "p",
        html: "Existe uma diferença brutal entre atender \"pequenas e médias empresas\" e atender \"clínicas de odontologia estética com faturamento acima de R$ 200 mil/mês na região Sul\". A primeira é uma descrição de mercado — a segunda é uma posição competitiva. Nichos premium são posições competitivas.",
      },
      {
        type: "p",
        html: "Neste artigo, vou dividir 9 nichos que estudei em profundidade nos últimos 18 meses e que combinam três características raras: capacidade de pagar bem, dor recorrente que justifica contrato longo e concorrência ainda baixa em quase todo o Brasil.",
      },
      { type: "h2", text: "Como identificar um nicho premium", id: "como-identificar" },
      {
        type: "checklist",
        items: [
          "Ticket médio do serviço do cliente acima de R$ 3.000.",
          "Recorrência natural (cliente do cliente volta a comprar).",
          "Decisor único e acessível (dono ou sócio, não comitê).",
          "Regulamentação clara (evita nichos cinzentos).",
          "Sazonalidade previsível (dá para planejar campanhas).",
        ],
      },
      { type: "h2", text: "Os 9 nichos que mais pagaram em 2025-2026", id: "top-nichos" },
      {
        type: "h3",
        text: "1. Clínicas de estética avançada e harmonização",
      },
      {
        type: "p",
        html: "Ticket alto, cliente recorrente, decisor claro. O desafio é o Conselho Federal de Medicina — todo material precisa respeitar regras claras de publicidade. Agências que dominam isso cobram entre R$ 4 mil e R$ 12 mil de fee.",
      },
      {
        type: "h3",
        text: "2. Escritórios de advocacia especializados",
      },
      {
        type: "p",
        html: "Advocacia previdenciária, tributária e trabalhista têm ciclos longos, ticket alto e cliente que valoriza autoridade. A OAB restringe publicidade — quem entende as regras vira referência quase por eliminação. Fee típico: R$ 3.500 a R$ 10 mil.",
      },
      {
        type: "h3",
        text: "3. Franquias em expansão regional",
      },
      {
        type: "p",
        html: "Redes de 20 a 80 unidades precisam de tráfego pago padronizado e material de marketing local. Contrato costuma ser anual e envolver múltiplas praças. Fee: R$ 8 mil a R$ 30 mil dependendo do número de unidades ativadas.",
      },
      {
        type: "h3",
        text: "4. Indústrias familiares médias (R$ 20-100 mi/ano)",
      },
      {
        type: "p",
        html: "Nicho subvalorizado. Muitas indústrias com 30-80 funcionários nunca tiveram marketing digital estruturado. Ciclo de venda é longo (3-6 meses), mas contrato médio passa de R$ 6 mil/mês e dura anos.",
      },
      {
        type: "h3",
        text: "5. Educação continuada e profissionalizante",
      },
      {
        type: "p",
        html: "Cursos técnicos, pós-graduações e certificações têm calendário previsível e verba constante. É um dos poucos nichos onde ROAS alto é regra, não exceção, quando a operação é bem feita.",
      },
      {
        type: "h3",
        text: "6. Imobiliárias de médio e alto padrão",
      },
      {
        type: "p",
        html: "Ticket médio da venda passa dos R$ 800 mil, então cada lead qualificado vale muito. O trabalho é técnico: portais, remarketing, funil longo. Fee: R$ 4 mil a R$ 15 mil.",
      },
      {
        type: "h3",
        text: "7. Saúde mental (clínicas e consultórios estruturados)",
      },
      {
        type: "p",
        html: "Crescente demanda pós-pandemia, muitos profissionais sem marketing sério. Requer sensibilidade editorial e conformidade com o CFP. Nicho ideal para agências que gostam de conteúdo.",
      },
      {
        type: "h3",
        text: "8. Ecommerce vertical acima de R$ 500 mil/mês",
      },
      {
        type: "p",
        html: "Fuja de e-commerce iniciante — margem apertada e cliente inseguro. O nicho premium está em lojas verticais consolidadas (moda praia, suplementos, pet) que já passaram do ponto de virada e precisam escalar sem quebrar operação.",
      },
      {
        type: "h3",
        text: "9. SaaS B2B early-stage brasileiro",
      },
      {
        type: "p",
        html: "Startups com aporte seed ou série A precisam de aquisição previsível. Ticket médio de fee alto (R$ 8 mil+), mas exige agência com conhecimento real de funil de produto e retenção.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Nicho de nicho vale mais",
        body:
          "Em 2026, quem se posiciona em subnichos vence. \"Agência para clínicas\" é raso. \"Agência para clínicas de otorrinolaringologia em capitais do Sudeste\" é uma posição que vale ouro.",
      },
      { type: "h2", text: "Nichos para evitar (mesmo que pareçam tentadores)", id: "evitar" },
      {
        type: "list",
        items: [
          "Restaurantes independentes: margem apertada, decisor operacional, cancelamento rápido.",
          "Salões e barbearias individuais: ticket baixo, alto churn, orçamento imprevisível.",
          "Coaches sem produto estruturado: alto risco reputacional e sazonalidade caótica.",
          "MEIs prestadores de serviço: raramente aguentam fee acima de R$ 800.",
        ],
      },
      { type: "h2", text: "Como se posicionar depois de escolher o nicho", id: "posicionar" },
      {
        type: "steps",
        items: [
          { title: "Renomeie", body: "O nome da agência ou a linha de comunicação precisa gritar o nicho na primeira olhada." },
          { title: "Especialize o portfólio", body: "Um case forte no nicho abre mais portas que 10 cases dispersos." },
          { title: "Domine a linguagem", body: "Estude jargão, eventos, associações. Cliente de nicho reconhece quem é de fora em 30 segundos." },
          { title: "Frequente o ecossistema", body: "Eventos setoriais, grupos privados e associações profissionais rendem indicações qualificadas." },
        ],
      },
      {
        type: "cta",
        title: "Complemento tático",
        body: "Escolhido o nicho, hora de precificar corretamente para não deixar dinheiro na mesa.",
        label: "Ver: Precificação Estratégica",
        href: "/artigos/precificacao-estrategica-para-agencias",
      },
    ],
    faq: [
      {
        q: "Posso atender mais de um nicho ao mesmo tempo?",
        a: "Pode, mas não deve nos primeiros 18 meses. Reputação de nicho é uma composição lenta, e cada troca de foco reinicia o cronômetro. Depois de consolidada em um nicho, expandir para adjacentes é natural.",
      },
      {
        q: "E se meu primeiro cliente for de outro nicho?",
        a: "Atenda com excelência, mas não deixe entrar no discurso oficial da agência. Ele é receita — não é posicionamento. Muita agência confunde os dois e nunca sai do lugar.",
      },
      {
        q: "Como saber se um nicho tem demanda suficiente na minha cidade?",
        a: "Faça o teste dos 100: liste 100 empresas potenciais em raio de 200km. Se não conseguir, o nicho é geograficamente restrito e você precisa atuar 100% remoto ou trocar de foco.",
      },
    ],
    internalLinks: [
      { title: "Como Abrir uma Agência em 2026", slug: "como-abrir-agencia-de-marketing-digital-em-2026" },
      { title: "Prospecção Fria para Agências", slug: "prospeccao-fria-para-agencias-de-marketing" },
      { title: "Precificação Estratégica", slug: "precificacao-estrategica-para-agencias" },
    ],
    externalLinks: [
      { title: "CFM — Resolução de Publicidade Médica", url: "https://portal.cfm.org.br/", source: "Conselho Federal de Medicina" },
      { title: "OAB — Provimento de Publicidade", url: "https://www.oab.org.br/", source: "OAB" },
    ],
  },

  {
    slug: "precificacao-estrategica-para-agencias",
    title: "Precificação Estratégica para Agências: Como Sair do Fee Baixo Sem Perder o Cliente",
    subtitle:
      "Frameworks de precificação usados por agências que faturam entre R$ 50 mil e R$ 500 mil por mês. Sem planilha inflada, sem chute.",
    metaDescription:
      "Aprenda a precificar serviços de agência de marketing com base em valor, resultado e escopo. Modelos de fee mensal, projeto e performance com exemplos reais.",
    keywords: ["precificação agência", "fee mensal agência", "como cobrar agência marketing", "value based pricing agência"],
    category: "Gestão",
    badge: "Financeiro",
    badgeColor: "blue",
    author: AUTHOR_ANA.name,
    authorBio: AUTHOR_ANA.bio,
    date: "20 de Julho, 2026",
    dateISO: "2026-07-20",
    readTime: "11 min",
    image: images.cardManagement,
    imageAlt: "Calculadora, contrato e laptop simbolizando negociação de precificação",
    tldr: [
      "Precifique por valor entregue, não por horas trabalhadas.",
      "Fee mensal é o pilar; projeto e performance são complementos.",
      "Sempre tenha uma versão premium que custa 3x mais que a padrão.",
      "Aumente preço a cada 6 meses, sem culpa, para novos clientes.",
    ],
    blocks: [
      {
        type: "p",
        html: "A dúvida sobre quanto cobrar mata mais agência do que qualquer crise de mercado. E ela mata porque a maioria dos donos aprende a precificar olhando o concorrente, não olhando o próprio negócio. O resultado é uma corrida ao fundo do poço travestida de \"preço competitivo\".",
      },
      { type: "h2", text: "Três modelos de precificação que realmente funcionam", id: "modelos" },
      {
        type: "h3",
        text: "1. Fee mensal recorrente (o padrão-ouro)",
      },
      {
        type: "p",
        html: "É o modelo que sustenta 80% do faturamento de uma agência saudável. Cliente paga um valor fixo por mês em troca de escopo padronizado e SLA claro. Previsível para o cliente, previsível para você. Sempre estipule contrato mínimo de 3 meses e reajuste anual atrelado ao IPCA + 2%.",
      },
      {
        type: "h3",
        text: "2. Projeto pontual (para entrada ou desenvolvimento específico)",
      },
      {
        type: "p",
        html: "Bom para diagnósticos, sprints, redesenhos ou lançamentos. Prazo definido, escopo definido, preço definido. Nunca deve ser mais de 30% do faturamento total — projeto é ótimo para receita extra, péssimo para previsibilidade.",
      },
      {
        type: "h3",
        text: "3. Performance / comissão sobre resultado",
      },
      {
        type: "p",
        html: "Só faz sentido em cima de fee mensal existente. Trabalhar 100% em performance transforma agência em sócio silencioso do cliente sem os direitos de sócio. Modelo saudável: fee cobre operação, performance é bônus por meta batida.",
      },
      { type: "h2", text: "Framework de precificação por valor", id: "value-based" },
      {
        type: "p",
        html: "Precificar por valor significa cobrar em função do resultado que você entrega, não do tempo que você gasta. Se seu trabalho gera R$ 200 mil de receita para o cliente, cobrar R$ 4 mil de fee é razoável. Cobrar R$ 40 mil também pode ser razoável, dependendo da complexidade e da exclusividade da entrega.",
      },
      {
        type: "steps",
        items: [
          { title: "1. Descubra o LTV do cliente do seu cliente", body: "Quanto vale, em média, um cliente para ele nos próximos 12 meses?" },
          { title: "2. Estime quantos você é capaz de gerar", body: "Com o serviço proposto, quantos novos clientes por mês são realistas?" },
          { title: "3. Aplique a regra dos 10-20%", body: "Seu fee saudável é entre 10% e 20% do faturamento gerado. Abaixo, você é caro. Acima, é insustentável." },
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "O poder da ancoragem tripla",
        body:
          "Toda proposta comercial deve ter três opções: Essencial, Estratégico e Premium. O Premium custa entre 2,5 e 3x o Essencial. Aproximadamente 60% dos clientes escolhem o do meio — e é exatamente ali que deve estar o preço que você quer praticar.",
      },
      { type: "h2", text: "Como calcular o fee mínimo saudável", id: "fee-minimo" },
      {
        type: "stats",
        items: [
          { value: "R$ 15 mil", label: "Custo fixo mensal médio de uma agência de 3 pessoas" },
          { value: "40%", label: "Margem líquida saudável em serviços" },
          { value: "12", label: "Número mágico de contas ativas por gestor" },
          { value: "R$ 2.500", label: "Piso absoluto de fee em qualquer nicho decente" },
        ],
      },
      {
        type: "p",
        html: "Para calcular seu fee mínimo, some custo fixo + custo variável médio por cliente + margem desejada e divida pelo número de clientes que você quer atender. Se o número for baixo demais, o problema não é o preço — é o nicho, o serviço ou a estrutura.",
      },
      { type: "h2", text: "Aumentando preço sem perder cliente", id: "aumentar-preco" },
      {
        type: "steps",
        items: [
          { title: "1. Avise com 60 dias de antecedência", body: "Nada de reajuste de surpresa. Comunique com carta profissional e ligação em seguida." },
          { title: "2. Justifique com contexto", body: "Reajuste por IPCA é natural. Reajuste por ampliação de escopo, por melhoria de resultado, também." },
          { title: "3. Ofereça alternativa", body: "Cliente antigo pode manter o valor atual optando por escopo enxuto. Isso mostra respeito e reduz churn." },
          { title: "4. Absorva perdas pequenas", body: "Se perder 10% dos clientes com o reajuste, ainda assim seu MRR sobe. Faça a conta antes de recuar." },
        ],
      },
      {
        type: "quote",
        text: "Cliente que ameaça sair por 8% de reajuste ia sair pelo próximo motivo mesmo. Reajuste também é filtro.",
        cite: "Ana Ribeiro",
      },
      { type: "h2", text: "Erros comuns na precificação", id: "erros" },
      {
        type: "list",
        items: [
          "Copiar tabela de concorrente sem entender custo próprio.",
          "Dar desconto no primeiro \"caro\" do cliente, sem exploração de causa.",
          "Empacotar tudo no mesmo preço, tirando o poder das opções.",
          "Cobrar por hora em serviço criativo (você é penalizado por ser bom).",
          "Não reajustar por 2 anos e depois tentar 30% de uma vez.",
        ],
      },
      {
        type: "cta",
        title: "Próxima etapa: entrega padronizada",
        body: "Preço bom sem entrega organizada vira dor de cabeça. Estruture processo antes de subir fee.",
        label: "Ver: Operações de Agência",
        href: "/artigos/como-abrir-agencia-de-marketing-digital-em-2026",
      },
    ],
    faq: [
      {
        q: "Devo publicar meus preços no site?",
        a: "Depende do posicionamento. Nicho premium raramente publica — a conversa começa com diagnóstico. Nicho mais acessível pode publicar faixa inicial para filtrar leads. Ambos funcionam se forem coerentes com a marca.",
      },
      {
        q: "Como reagir quando o cliente diz \"está caro\"?",
        a: "Pergunte em relação a quê. Muitas vezes \"caro\" significa \"não entendi o valor\". Reexplique o resultado esperado, apresente o custo de não resolver e só então discuta escopo enxuto. Nunca corte preço sem cortar entrega.",
      },
      {
        q: "Value-based pricing vale para agência iniciante?",
        a: "Sim, desde o começo. Não é preciso ter case gigante — é preciso saber calcular o resultado esperado e comunicar com clareza. O pequeno diferencial na comunicação vale mais que anos de experiência.",
      },
    ],
    internalLinks: [
      { title: "Como Abrir uma Agência em 2026", slug: "como-abrir-agencia-de-marketing-digital-em-2026" },
      { title: "Nichos Premium", slug: "nichos-premium-para-agencias-em-2026" },
      { title: "Prospecção Fria", slug: "prospeccao-fria-para-agencias-de-marketing" },
    ],
    externalLinks: [
      { title: "IBGE — Índice IPCA", url: "https://www.ibge.gov.br/explica/inflacao.php", source: "IBGE" },
      { title: "Sebrae — Formação de preço", url: "https://sebrae.com.br/", source: "Sebrae" },
    ],
  },

  {
    slug: "ferramentas-de-ia-para-agencias-de-marketing",
    title: "Ferramentas de IA para Agências de Marketing em 2026: Stack Prático de Quem Realmente Usa",
    subtitle:
      "Uma seleção honesta das ferramentas que economizam horas por semana em agência — sem hype, sem promessa vazia.",
    metaDescription:
      "Guia completo das melhores ferramentas de IA para agências de marketing em 2026: copy, tráfego pago, atendimento, produção de conteúdo e operação.",
    keywords: ["ferramentas ia agência", "stack ia marketing", "ia para agência", "automação agência 2026"],
    category: "Ferramentas",
    badge: "Stack",
    badgeColor: "pink",
    author: AUTHOR_KATIA.name,
    authorBio: AUTHOR_KATIA.bio,
    date: "20 de Julho, 2026",
    dateISO: "2026-07-20",
    readTime: "10 min",
    image: images.cardTools,
    imageAlt: "Interface abstrata representando ferramentas de inteligência artificial e automação",
    tldr: [
      "IA não substitui estratégia; ela remove o trabalho braçal.",
      "Menos ferramentas usadas 100% valem mais que 20 usadas 20%.",
      "Sempre revise saída de IA antes de mandar para cliente.",
      "Ganho realista com IA bem aplicada: 6 a 10 horas/semana por gestor.",
    ],
    blocks: [
      {
        type: "p",
        html: "Depois de dois anos testando praticamente todo lançamento de IA relevante para agência, aprendi uma coisa contra-intuitiva: quem usa poucas ferramentas com profundidade tem operação mais eficiente que quem coleciona logins. Este guia é um recorte prático — só entrou o que rendeu resultado consistente em agências reais.",
      },
      { type: "h2", text: "Categorias essenciais no stack de 2026", id: "categorias" },
      {
        type: "list",
        items: [
          "Modelos de linguagem para copy, briefing e resposta a e-mail.",
          "Geração e edição de imagem estática.",
          "Vídeo curto (edição automática, legenda, cortes).",
          "Análise de dados e criação de dashboards.",
          "Automação de tarefas repetitivas (Zapier, Make, N8N).",
          "Transcrição e sumarização de reuniões.",
        ],
      },
      { type: "h2", text: "Modelos de linguagem: onde IA ainda ganha", id: "llms" },
      {
        type: "p",
        html: "Para agência, o modelo de linguagem se paga em três frentes: primeira versão de copy, respostas a briefings recorrentes e reformulação de e-mail. Rascunho, sempre. Publicação, nunca sem revisão humana. A regra dos 70% ajuda: se sai com qualidade mínima de 70%, um editor sênior fecha em pouco tempo.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Compliance com AdSense e Google",
        body:
          "Google exige que conteúdo de valor seja verificável, útil e escrito para pessoas. IA pura sem edição humana é frequentemente sinalizada como conteúdo raso. Use IA como assistente, não como redator titular.",
      },
      { type: "h2", text: "Geração de imagem: onde ficou realmente útil", id: "imagem" },
      {
        type: "p",
        html: "Em 2026, gerar hero de site, mockup de produto e variações de criativo publicitário é rotina. O que mudou: agora dá para manter consistência de personagem entre imagens, algo que em 2024 era praticamente impossível. Isso desbloqueou séries de posts com identidade única sem sessão fotográfica.",
      },
      {
        type: "checklist",
        items: [
          "Padronize prompt base por cliente (estilo, paleta, iluminação).",
          "Salve biblioteca de referências visuais para reuso.",
          "Sempre exporte em WebP para peso reduzido.",
          "Revise questões éticas: rostos reais e marcas de terceiros.",
        ],
      },
      { type: "h2", text: "Vídeo curto: o maior ganho de produtividade do ano", id: "video" },
      {
        type: "p",
        html: "Ferramentas de edição assistida cortam em automático, geram legenda, sugerem trilha e reformatam para múltiplos formatos. O ganho real em agência que produz conteúdo semanal para 8 clientes chega a 20 horas/mês. É a categoria com maior ROI em 2026, disparado.",
      },
      { type: "h2", text: "Análise de dados: dashboards que se explicam", id: "dados" },
      {
        type: "p",
        html: "A parte chata do relatório mensal — descrever o que aconteceu — está automatizada. Ferramentas conectam ao dashboard e geram narrativa executiva em segundos. O papel do estrategista muda: menos digitar, mais interpretar. Cliente percebe a diferença rapidinho.",
      },
      { type: "h2", text: "Automações que sustentam operação", id: "automacoes" },
      {
        type: "steps",
        items: [
          { title: "Onboarding de cliente", body: "Formulário disparado após assinatura cria pasta, envia acesso e agenda kickoff automaticamente." },
          { title: "Aprovação de conteúdo", body: "Fluxo com notificação, versionamento e prazo garante zero item perdido no WhatsApp." },
          { title: "Relatório mensal", body: "Coleta dados, monta template, gera comentário e envia por e-mail no dia 5 sem intervenção humana." },
          { title: "Cobrança e nota fiscal", body: "Integração com ferramenta de emissão elimina 4h/mês de retrabalho no financeiro." },
        ],
      },
      { type: "h2", text: "Sobre transcrição e sumarização de reunião", id: "reunioes" },
      {
        type: "p",
        html: "Toda reunião com cliente deve ser transcrita e resumida em ata automática. Isso reduz mal-entendido, cria histórico defensável e libera o gestor para focar na conversa em vez de anotar. É o hábito mais barato e de maior impacto que uma agência pode adotar em 2026.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Segurança e LGPD",
        body:
          "Antes de mandar qualquer dado sensível para uma ferramenta de IA, verifique política de retenção e se os dados são usados para treinamento. Contratos com clientes de saúde, educação e finanças costumam ter cláusulas específicas sobre isso.",
      },
      { type: "h2", text: "O stack enxuto que eu recomendo hoje", id: "stack" },
      {
        type: "stats",
        items: [
          { value: "1", label: "Modelo de linguagem principal (com fallback)" },
          { value: "1", label: "Ferramenta de imagem" },
          { value: "1", label: "Editor de vídeo assistido" },
          { value: "1", label: "Automação (Make, N8N ou Zapier)" },
          { value: "1", label: "Transcrição de reuniões" },
          { value: "1", label: "Analytics conversacional" },
        ],
      },
      {
        type: "cta",
        title: "Estratégia primeiro, ferramenta depois",
        body: "IA acelera quem sabe onde quer chegar. Se posicionamento e nicho ainda não estão claros, comece pela base.",
        label: "Ver: Nichos Premium",
        href: "/artigos/nichos-premium-para-agencias-em-2026",
      },
    ],
    faq: [
      {
        q: "IA vai substituir agência de marketing?",
        a: "IA substitui tarefa, não substitui estratégia. O trabalho de definir posicionamento, entender cliente e orquestrar canais segue humano. O que muda é a produtividade individual — uma pessoa faz hoje o que exigia três em 2022.",
      },
      {
        q: "Preciso pagar todas as ferramentas premium?",
        a: "Não. Comece com planos gratuitos ou introdutórios, valide uso, migre para pago quando o custo se paga em horas economizadas. Regra: ferramenta só passa para pago quando economiza pelo menos 2h/semana.",
      },
      {
        q: "Como treinar o time para usar IA sem perder qualidade?",
        a: "Estabeleça um manual interno de prompts, revisão humana obrigatória e checklist de qualidade. Sem processo, cada pessoa usa de um jeito e o resultado fica inconsistente para o cliente.",
      },
    ],
    internalLinks: [
      { title: "Como Abrir uma Agência em 2026", slug: "como-abrir-agencia-de-marketing-digital-em-2026" },
      { title: "Nichos Premium", slug: "nichos-premium-para-agencias-em-2026" },
      { title: "Precificação Estratégica", slug: "precificacao-estrategica-para-agencias" },
    ],
    externalLinks: [
      { title: "Google — Diretrizes de qualidade de conteúdo", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content", source: "Google Search Central" },
      { title: "ANPD — Lei Geral de Proteção de Dados", url: "https://www.gov.br/anpd/pt-br", source: "ANPD" },
    ],
  },
  {
    slug: "slogans-para-agencia-de-marketing-100-ideias-e-como-escolher",
    title: "Slogans para Agência de Marketing: 100+ Ideias e Como Escolher o Nome Perfeito",
    subtitle:
      "Um guia prático para founders na fase de branding: como nomear sua agência, criar um slogan memorável e blindar a marca desde o dia zero.",
    metaDescription:
      "Guia completo com 100+ ideias de slogans e nomes para agência de marketing. Metodologia, exemplos reais, checklist jurídico e erros que matam a marca antes de nascer.",
    keywords: [
      "slogan para agência de marketing",
      "nome para agência de marketing",
      "ideias de slogan agência",
      "como escolher nome de agência",
      "branding para agência",
    ],
    category: "Nichos",
    badge: "Branding",
    badgeColor: "pink",
    author: AUTHOR_ANA.name,
    authorBio: AUTHOR_ANA.bio,
    date: "20 de Julho, 2026",
    dateISO: "2026-07-20",
    readTime: "14 min",
    image: images.cardContent,
    imageAlt: "Mesa criativa com anotações de branding, nomes e slogans para agência de marketing",
    tldr: [
      "Nome fraco custa 3x mais em mídia para ficar memorável — invista tempo antes de pagar por reconhecimento.",
      "Slogan bom cabe em uma linha, promete um resultado e diferencia do concorrente genérico.",
      "Registre o nome no INPI e o domínio .com.br antes de imprimir cartão de visitas.",
      "100+ exemplos deste guia servem como faísca; a escolha final precisa passar pelo teste do cliente ideal.",
    ],
    blocks: [
      {
        type: "p",
        html: "Escolher o nome e o slogan da agência é a primeira decisão de marketing que você toma como founder. E é também a mais subestimada. A maioria decide em uma tarde, testa em três amigos e imprime cartão. Seis meses depois, descobre que o nome já está registrado, que o slogan não diz nada e que ninguém lembra da marca uma semana depois de conhecê-la.",
      },
      {
        type: "p",
        html: "Este guia condensa o processo que uso com founders de agência há mais de uma década. Você vai sair daqui com um método, um checklist jurídico e mais de 100 ideias reais para destravar sua criatividade — não para copiar.",
      },
      { type: "h2", text: "Por que nome e slogan importam mais do que você pensa", id: "por-que-importam" },
      {
        type: "p",
        html: "Nome é atalho cognitivo. O cérebro do prospect leva menos de dois segundos para decidir se sua marca soa profissional, criativa, cara, barata ou confiável. Slogan é a promessa em uma linha — é o que fica quando o cliente fecha a aba. Juntos, eles reduzem custo de aquisição, encurtam ciclo de venda e aumentam preço percebido.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "Regra dos 3 segundos",
        body:
          "Se um estranho não consegue entender o que sua agência faz e para quem, apenas lendo nome + slogan em 3 segundos, sua marca ainda não está pronta para escalar.",
      },
      { type: "h2", text: "Os 5 arquétipos de nome de agência", id: "arquetipos" },
      {
        type: "steps",
        items: [
          {
            title: "1. Nome descritivo",
            body:
              "Diz exatamente o que faz. Exemplos: Performance Digital, Growth Studio, SEO Brasil. Vantagem: SEO local e clareza. Desvantagem: baixa diferenciação e limita expansão futura.",
          },
          {
            title: "2. Nome evocativo",
            body:
              "Sugere um conceito abstrato. Exemplos: Órbita, Ponte, Fábula, Norte. Vantagem: memorável e flexível. Desvantagem: exige investimento em posicionamento para explicar o que faz.",
          },
          {
            title: "3. Nome fundador",
            body:
              "Usa o nome do dono. Exemplos: Ribeiro & Co, Freitas Marketing. Vantagem: autoridade pessoal. Desvantagem: dificulta venda futura da empresa e transferência de reputação.",
          },
          {
            title: "4. Nome inventado",
            body:
              "Palavra nova, curta, sonora. Exemplos: Zuma, Loop, Yalo. Vantagem: domínio disponível e registro fácil no INPI. Desvantagem: precisa contexto para não soar aleatório.",
          },
          {
            title: "5. Nome composto",
            body:
              "Junta duas ideias. Exemplos: Lab de Conteúdo, Casa da Marca, Oficina Digital. Vantagem: equilibra descrição e evocação. Desvantagem: pode ficar longo demais para redes sociais.",
          },
        ],
      },
      { type: "h2", text: "O método em 6 passos para criar seu nome", id: "metodo" },
      {
        type: "list",
        ordered: true,
        items: [
          "Defina o nicho antes do nome. Uma agência para clínicas de estética pede um nome diferente de uma para SaaS B2B.",
          "Liste 30 palavras associadas ao resultado que você entrega — não ao serviço.",
          "Combine essas palavras em pares e faça brainstorm sem filtro por 40 minutos.",
          "Elimine tudo que soa genérico, difícil de soletrar ou já usado por concorrente relevante.",
          "Teste os 5 finalistas com 10 clientes ideais reais — não com a família.",
          "Só depois compre domínio, registre CNPJ e inicie o processo no INPI.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Cuidado com nomes em inglês forçados",
        body:
          "'Growth Hackers Digital Solutions Brasil' virou piada em muitos nichos. Inglês funciona quando o cliente ideal já fala inglês (SaaS, cripto, tech). Para PME local, português direto vende mais.",
      },
      { type: "h2", text: "50 ideias de nomes para inspirar", id: "50-nomes" },
      { type: "h3", text: "Evocativos e minimalistas (15)" },
      {
        type: "list",
        items: [
          "Órbita", "Norte", "Farol", "Prisma", "Ápice", "Fábula", "Vórtice", "Ponte",
          "Ritmo", "Traço", "Vértice", "Zênite", "Aurora", "Kairós", "Tessera",
        ],
      },
      { type: "h3", text: "Compostos com identidade (15)" },
      {
        type: "list",
        items: [
          "Casa da Marca", "Lab de Conteúdo", "Oficina Digital", "Estúdio Verbo",
          "Ateliê Performance", "Fábrica de Funis", "Coletivo Sinal", "Ponto de Vista",
          "Time do Crescimento", "Escola do Cliente", "Rede Vertical", "Cais Criativo",
          "Praça Digital", "Rota Aberta", "Bússola Comercial",
        ],
      },
      { type: "h3", text: "Inventados curtos e sonoros (10)" },
      {
        type: "list",
        items: ["Zuma", "Yalo", "Kavo", "Miro", "Nuvo", "Trilo", "Rive", "Onda", "Vira", "Lume"],
      },
      { type: "h3", text: "Nichados por vertical (10)" },
      {
        type: "list",
        items: [
          "Clínica em Alta (saúde)", "Vitrine Local (varejo)", "Menu Cheio (food)",
          "Ata Cheia (jurídico)", "Reforma Digital (construção)", "Cadeira Cheia (barbearia)",
          "Sala de Aula (educação)", "Ficha Verde (fitness)", "Rota Fechada (turismo)",
          "Portfólio Vivo (imobiliário)",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Use essa lista como faísca, não como resposta",
        body:
          "Copiar nome de exemplo público te coloca em rota de conflito de marca. Combine, distorça, traduza — mas nunca copie um nome pronto.",
      },
      { type: "h2", text: "A anatomia de um slogan que vende", id: "anatomia-slogan" },
      {
        type: "p",
        html: "Um bom slogan de agência responde três perguntas em uma frase: <strong>o que você faz, para quem e qual o resultado</strong>. Ele evita jargão, promete algo mensurável e não usa a palavra 'soluções' (a mais gasta do mercado brasileiro de agências).",
      },
      {
        type: "stats",
        items: [
          { value: "≤ 8", label: "palavras no slogan ideal" },
          { value: "1", label: "promessa central por marca" },
          { value: "0", label: "vezes que 'soluções' deveria aparecer" },
          { value: "3s", label: "tempo máximo para entender" },
        ],
      },
      { type: "h2", text: "60+ ideias de slogans por categoria", id: "60-slogans" },
      { type: "h3", text: "Slogans focados em resultado (15)" },
      {
        type: "list",
        items: [
          "Marketing que gera reunião, não só curtida.",
          "Mais clientes. Menos achismo.",
          "Sua agenda cheia começa aqui.",
          "Do clique ao contrato assinado.",
          "Vendas previsíveis, todo mês.",
          "Tráfego que vira faturamento.",
          "Menos vaidade, mais receita.",
          "Marketing com meta, não com achismo.",
          "Cada real investido volta com juros.",
          "Nós entregamos oportunidade, não impressão.",
          "Sua próxima venda mora aqui dentro.",
          "Resultado antes do relatório bonito.",
          "Meta batida é o único KPI que importa.",
          "Cliente novo toda semana. Sem exagero.",
          "Marketing pago que se paga.",
        ],
      },
      { type: "h3", text: "Slogans com posicionamento premium (15)" },
      {
        type: "list",
        items: [
          "A agência das marcas que não têm pressa.",
          "Marketing artesanal para marcas que querem durar.",
          "Estratégia primeiro. Estética depois.",
          "Menos clientes. Mais atenção.",
          "Para quem enxerga marca como ativo.",
          "Onde branding e performance se encontram.",
          "Marketing pensado. Nunca terceirizado.",
          "Sua marca merece mais do que template.",
          "Feito à mão. Escalável por design.",
          "A diferença está no detalhe que ninguém vê.",
          "Menos ruído. Mais marca.",
          "Marketing que envelhece bem.",
          "Um portfólio pequeno. Cases enormes.",
          "Cocriamos. Não executamos ordem de serviço.",
          "A marca certa, no ritmo certo.",
        ],
      },
      { type: "h3", text: "Slogans para agências nichadas (15)" },
      {
        type: "list",
        items: [
          "Marketing feito por quem entende clínica.",
          "A agência oficial dos advogados que crescem.",
          "SaaS B2B: do MQL ao contrato anual.",
          "Restaurante lotado começa no Instagram certo.",
          "E-commerce que vende também no ROAS.",
          "Educação privada com matrícula previsível.",
          "Construtoras que vendem planta na planta.",
          "Beleza com agenda cheia, sem descontinho.",
          "Consultoria que vira pipeline.",
          "Franquia expandindo com marketing central.",
          "Escritórios contábeis que faturam mais.",
          "Imobiliária com lead qualificado, não curioso.",
          "Fitness com aluno novo toda segunda-feira.",
          "Turismo com alta temporada o ano todo.",
          "Indústria B2B que enfim aparece no Google.",
        ],
      },
      { type: "h3", text: "Slogans curtos e memoráveis (15)" },
      {
        type: "list",
        items: [
          "Menos ruído. Mais marca.",
          "Cresça com método.",
          "Marca que gira.",
          "Vender é ciência.",
          "Marketing sem enfeite.",
          "Pense grande. Execute preciso.",
          "Marca viva. Cliente novo.",
          "Estratégia com endereço.",
          "Do plano ao lucro.",
          "Sua marca em movimento.",
          "Cresce quem mede.",
          "Marketing que respeita seu tempo.",
          "Marca com propósito. Venda com método.",
          "Menos slides. Mais receita.",
          "Simples. Certeiro. Escalável.",
        ],
      },
      { type: "h2", text: "Checklist jurídico antes de fechar a escolha", id: "checklist-juridico" },
      {
        type: "checklist",
        items: [
          "Pesquisar o nome no site do INPI (busca de marca) para ver se já existe registro em classes de marketing/publicidade.",
          "Verificar disponibilidade de domínio .com.br e .com no Registro.br e no registrador internacional.",
          "Checar @usuário disponível no Instagram, LinkedIn, YouTube e TikTok.",
          "Fazer busca reversa no Google entre aspas para descobrir concorrentes com nome parecido.",
          "Iniciar o pedido de registro de marca no INPI antes de gastar em identidade visual.",
          "Registrar CNPJ com nome fantasia idêntico ao nome escolhido para evitar retrabalho.",
          "Guardar prints e datas de tudo — em disputa, quem prova primeiro uso costuma ganhar.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Registrar marca não é opcional",
        body:
          "Sem registro no INPI, qualquer concorrente com mais capital pode registrar o nome que você criou e te obrigar a mudar. Já vi agências com 4 anos de mercado perdendo o nome por não ter feito esse passo.",
      },
      { type: "h2", text: "Como testar nome e slogan antes de assumir", id: "como-testar" },
      {
        type: "steps",
        items: [
          {
            title: "1. Teste de soletração",
            body:
              "Fale o nome ao telefone para 5 pessoas e peça para escreverem. Se mais de 2 errarem, o nome é frágil para indicações boca a boca.",
          },
          {
            title: "2. Teste de memória",
            body:
              "Mostre nome + slogan por 5 segundos, distraia por 2 minutos e peça para repetirem. Menos de 60% de acerto = fraco.",
          },
          {
            title: "3. Teste de posicionamento",
            body:
              "Pergunte ao cliente ideal: 'o que você acha que essa agência faz?'. Se a resposta não bater com sua oferta, o slogan não comunica.",
          },
          {
            title: "4. Teste de preço",
            body:
              "Mostre a marca e pergunte quanto acham que custa um projeto médio. Se o número for muito abaixo do seu preço real, o branding precisa subir de nível antes de vender.",
          },
        ],
      },
      { type: "h2", text: "Erros que matam a marca antes de nascer", id: "erros" },
      {
        type: "list",
        items: [
          "Escolher pelo gosto do sócio, não pelo perfil do cliente.",
          "Ignorar SEO no nome (nomes impossíveis de buscar no Google).",
          "Copiar slogan de agência famosa gringa sem contexto local.",
          "Deixar registro no INPI 'para depois' — depois vira nunca.",
          "Slogan longo demais para caber em bio de Instagram.",
          "Nome que envelhece rápido: 'Growth 4.0', 'Metaverso Studio', 'AI Agency Brasil'.",
          "Domínio .com.br indisponível resolvido com hífens ou números.",
        ],
      },
      {
        type: "cta",
        title: "Nome pronto? Hora de precificar direito.",
        body:
          "Marca forte sem precificação estratégica ainda deixa dinheiro na mesa. Veja como cobrar pelo valor que você entrega, não pela hora.",
        label: "Ler: Precificação Estratégica",
        href: "/artigos/precificacao-estrategica-para-agencias",
      },
    ],
    faq: [
      {
        q: "Posso mudar o nome da minha agência depois de 1 ano?",
        a: "Pode, mas custa caro em reconhecimento perdido. Se o nome atual não te representa, faça o rebranding com aviso de 60 dias, transição visual clara e uma narrativa pública explicando o motivo. Clientes respeitam decisão bem comunicada.",
      },
      {
        q: "Preciso contratar uma agência de branding para criar o nome?",
        a: "Não obrigatoriamente. Founders com clareza de nicho e método conseguem chegar em um bom nome sozinhos. Contrate branding profissional quando precisar de identidade visual completa, verbal system e manual de marca — não apenas para nomear.",
      },
      {
        q: "Slogan e tagline são a mesma coisa?",
        a: "Na prática do mercado brasileiro sim. Tecnicamente, tagline acompanha a marca por muitos anos (é quase parte do logo), e slogan pode ser trocado por campanha. Para agência iniciante, foque em criar uma tagline forte primeiro.",
      },
      {
        q: "Devo registrar marca no INPI antes ou depois do primeiro cliente?",
        a: "Antes. O registro leva de 12 a 24 meses, e o direito começa a valer da data do pedido. Quanto antes você protocola, mais protegido você fica em caso de disputa futura.",
      },
      {
        q: "Vale a pena usar meu próprio nome como nome da agência?",
        a: "Vale se sua marca pessoal já for um ativo real (autoridade pública, palestras, conteúdo). Não vale se você quer construir uma empresa vendável no futuro — vender uma marca com nome de pessoa é bem mais difícil.",
      },
    ],
    internalLinks: [
      { title: "Como Abrir uma Agência em 2026", slug: "como-abrir-agencia-de-marketing-digital-em-2026" },
      { title: "Nichos Premium para Agências", slug: "nichos-premium-para-agencias-em-2026" },
      { title: "Precificação Estratégica", slug: "precificacao-estrategica-para-agencias" },
    ],
    externalLinks: [
      { title: "INPI — Busca e registro de marcas", url: "https://www.gov.br/inpi/pt-br", source: "INPI" },
      { title: "Registro.br — Consulta de domínios", url: "https://registro.br/", source: "Registro.br" },
      { title: "Sebrae — Guia de branding para pequenas empresas", url: "https://sebrae.com.br/", source: "Sebrae" },
    ],
  },
];


export function getArticle(slug: string): FullArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
