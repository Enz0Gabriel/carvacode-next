# CarvaCode — site institucional

Site da CarvaCode (https://www.carvacodeweb.com), feito com Next.js 15 (App Router), React 19 e Tailwind CSS 4.

## Requisitos

- Node.js 18.18 ou superior (testado com 22 LTS). Os testes usam a execução nativa de TypeScript do Node, disponível a partir do 22.18.
- npm

## Comandos

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run typecheck  # checagem de tipos (tsc)
npm test           # testes da validação e da rota de contato (node --test, e-mail simulado)
npm run build      # build de produção
npm run check      # typecheck + testes + build
```

Não há ESLint configurado no projeto.

## Onde alterar o conteúdo

| O quê | Arquivo |
| --- | --- |
| E-mail, telefone, WhatsApp, horário, título e descrição do site | `src/config/site.ts` |
| Frentes de solução (cards e atalhos do topo) | `src/content/solutions.ts` |
| Exemplos de aplicação, processo, equipe, perguntas frequentes | `src/components/Examples.tsx`, `Process.tsx`, `Team.tsx`, `Faq.tsx` |
| Opções e regras do formulário | `src/lib/contact.ts` |
| Política de privacidade | `src/app/privacidade/page.tsx` |
| Datas do sitemap | `src/app/sitemap.ts` |

`src/config/site.ts` é importado no navegador: não coloque segredos nele.

Os cards de solução pré-selecionam o interesse no formulário. Links externos também podem fazer isso com `?interesse=<valor>#contact`, por exemplo `https://www.carvacodeweb.com/?interesse=sistemas#contact` (valores: `sites`, `sistemas`, `aplicativos`, `integracoes`, `outro`).

## Formulário de contato

O formulário envia para `POST /api/contact`, que encaminha a mensagem por e-mail usando o [Resend](https://resend.com).

### Variáveis de ambiente

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `RESEND_API_KEY` | sim | Chave da API do Resend. Sem ela, a rota responde 503 e nada é enviado. |
| `CONTACT_TO_EMAIL` | não | Caixa que recebe as mensagens. Padrão: o Gmail da equipe (ver abaixo). |
| `CONTACT_FROM_EMAIL` | não | Remetente. Padrão: `CarvaCode Site <contato@carvacodeweb.com>`; precisa estar em domínio verificado no Resend. |

### Destinatário (decisão)

O endereço público do site é `contato@carvacodeweb.com`. As mensagens do formulário continuam sendo entregues no Gmail já usado pela equipe, porque é a caixa com recebimento comprovado. Alterar o texto público não configura o recebimento no novo endereço.

Para passar a receber em `contato@carvacodeweb.com`:

1. Confirme que o domínio tem registros MX e que a caixa recebe e-mails (envie um teste de outra conta).
2. Defina `CONTACT_TO_EMAIL=contato@carvacodeweb.com` na hospedagem.
3. Atualize a seção "Como o envio funciona" de `src/app/privacidade/page.tsx`, que hoje cita o Gmail.

### Proteções da rota

- Aceita apenas JSON (`415` caso contrário); corpo limitado a 16 KB (`413`); JSON inválido responde `400`.
- Validação no servidor de tipos, formatos, tamanhos e opções permitidas (`422` com erro por campo), compartilhada com o navegador.
- Requisições com `Origin` de outro domínio são recusadas (`403`).
- Limite de 5 envios a cada 10 minutos por IP (`429`). É um limitador em memória: em hospedagem serverless cada instância tem a sua contagem, então ele reduz abusos simples, mas não substitui proteção da plataforma (ex.: firewall/rate limit da hospedagem).
- Campo isca invisível para robôs: se preenchido, a rota responde sucesso sem enviar.
- Timeout de 10 s no provedor (`504`); falha do provedor responde `502`.
- Os logs registram apenas o tipo do evento e códigos técnicos, sem nome, e-mail, telefone ou mensagem.

### Testar o envio sem mandar e-mail real

Os testes automatizados (`npm test`) usam um provedor de e-mail simulado. Para rodar o site localmente sem enviar e-mails, crie um `.env.development.local` (tem prioridade sobre `.env.local` no `next dev`) com:

```
RESEND_API_KEY=
```

Com isso, um envio válido termina com a mensagem de indisponibilidade (503), sem chamar o Resend. Para `next start`, o arquivo equivalente é `.env.production.local`.

O teste de entrega real (chegada na caixa, `reply-to`, remetente autenticado) deve ser feito na hospedagem com autorização, conferindo também o painel de envios do Resend.

## Dependências e segurança

- Next.js fixado na linha 15 (`15.5.28`, último backport com correções de segurança). A migração para a versão 16 não foi feita.
- `npm audit` ainda aponta o `postcss` 8.4.31 que o Next 15 fixa internamente. Ele roda apenas no build, processando o CSS do próprio repositório; a correção só existe no Next 16.

## Estrutura

```
src/app/                 páginas, layout, metadados, sitemap, imagem social e rota /api/contact
src/components/          seções da página (servidor) e partes interativas (cliente)
src/config/site.ts       dados públicos de contato
src/content/             conteúdo compartilhado entre seções
src/lib/                 validação, rota de contato (testável) e utilitários
tests/                   testes com node --test
public/                  robots.txt e logo em PNG (gerado de src/assets/logo.svg)
```
