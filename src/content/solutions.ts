import { Globe, LayoutDashboard, Smartphone, Workflow, type LucideIcon } from 'lucide-react';

import type { Interest } from '@/lib/contact';

export interface Solution {
  id: string;
  interest: Interest;
  icon: LucideIcon;
  title: string;
  /** Frase curta usada no painel de abertura. */
  need: string;
  description: string;
  items: string[];
  cta: string;
}

export const SOLUTIONS: Solution[] = [
  {
    id: 'solucao-sites',
    interest: 'sites',
    icon: Globe,
    title: 'Sites e presença digital',
    need: 'Apresentar a empresa e receber contatos',
    description:
      'Para apresentar sua empresa com clareza, explicar o que você oferece e facilitar o contato de novos clientes.',
    items: [
      'Site institucional ou página para uma campanha',
      'Textos e estrutura pensados para quem vai ler',
      'Boa leitura no celular e no computador',
      'Base de SEO: títulos, descrições e indexação',
      'Formulário e WhatsApp ligados ao atendimento',
    ],
    cta: 'Conversar sobre um site',
  },
  {
    id: 'solucao-sistemas',
    interest: 'sistemas',
    icon: LayoutDashboard,
    title: 'Sistemas e portais para empresas',
    need: 'Organizar processos, pedidos e clientes',
    description:
      'Para organizar processos que hoje dependem de planilhas, e-mails e mensagens soltas.',
    items: [
      'Painéis administrativos e cadastros',
      'Portal para clientes, parceiros ou fornecedores',
      'Acesso por usuário, com permissões por perfil',
      'Relatórios e exportação de dados',
    ],
    cta: 'Conversar sobre um sistema',
  },
  {
    id: 'solucao-aplicativos',
    interest: 'aplicativos',
    icon: Smartphone,
    title: 'Aplicativos',
    need: 'Levar um serviço para o celular',
    description:
      'Para quando sua equipe ou seus clientes precisam usar o serviço no celular, no dia a dia.',
    items: [
      'Aplicativos para Android e iOS com uma base de código',
      'Conectados ao mesmo sistema e aos mesmos dados da empresa',
      'Telas pensadas para uso rápido',
    ],
    cta: 'Conversar sobre um aplicativo',
  },
  {
    id: 'solucao-integracoes',
    interest: 'integracoes',
    icon: Workflow,
    title: 'Integrações, automações e evolução',
    need: 'Conectar ferramentas e melhorar o que já existe',
    description:
      'Para conectar as ferramentas que você já usa, reduzir tarefas manuais e continuar melhorando um software existente.',
    items: [
      'Integração entre sistemas por meio de APIs',
      'Automação de tarefas repetitivas',
      'Manutenção e novas funcionalidades',
      'Publicação em servidor ou nuvem',
    ],
    cta: 'Conversar sobre integrações',
  },
];
