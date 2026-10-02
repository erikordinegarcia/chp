# Site — CHP Automação | Instalação e Manutenção de Sistemas Industriais

Site institucional em HTML, CSS e JavaScript puro (sem frameworks). Basta abrir `index.html` no navegador para visualizar.

## Estrutura

```
/
├── index.html
├── css/style.css
├── js/script.js
└── assets/
    ├── images/   → fotos do site
    ├── icons/    → ícones adicionais, se necessário
    └── logo/     → logo e favicon
```

## O que precisa ser substituído antes de publicar

1. **Imagens** (pasta `assets/images/`) — atualmente há placeholders com fundo escuro/ciano no lugar das fotos:
   - `hero-industrial.jpg` — imagem da seção inicial (Hero), ideal foto de braço robótico/linha industrial
   - `equipe-chp.jpg` — foto da seção "Sobre Nós" (equipe, fábrica ou instalação)
   - `diferenciais-bg.jpg` (opcional) — imagem decorativa de fundo na seção "Diferenciais"
   Depois de adicionar os arquivos, troque os blocos `<div class="hero__image-placeholder">`, `<div class="about__image-placeholder">` e `<div class="differentials__decor-placeholder">` por `<img>` apontando para os arquivos correspondentes (há comentários no HTML indicando exatamente onde).

2. **Logo** (pasta `assets/logo/`) — o cabeçalho usa um ícone SVG genérico (engrenagem estilizada). Se houver uma logo própria (como a enviada nas referências), substitua o bloco `.logo__mark` no `index.html` (aparece duas vezes: header e rodapé) e adicione um `favicon.png`.

3. **Serviços** — os 6 cards da seção "Serviços" são **exemplos genéricos** de automação industrial (Instalação de Linhas, Manutenção Preventiva, Automação de Processos, Integração de Robôs, Retrofit, Consultoria). Ajuste para os serviços reais oferecidos pela CHP.

4. **Texto institucional (Sobre Nós)** — o texto é genérico e não inclui histórico real, CNPJ ou especializações específicas. Substitua pelo texto real da empresa.

5. **Dados de contato** — telefone, WhatsApp, e-mail e CNPJ são placeholders (`0000-0000`, `00.000.000/0001-00`). Atualize em:
   - Botão "Falar Conosco" do cabeçalho e menu mobile
   - Seção "Fale com a CHP" (`#contato`)
   - Botão flutuante do WhatsApp
   - Rodapé (redes sociais e texto de copyright)

6. **Formulário de contato** — atualmente apenas valida os campos no navegador e não envia dados de verdade. Para receber as mensagens, é necessário integrar com um backend, serviço de e-mail (ex.: Formspree, EmailJS) ou similar.

## Paleta de cores (definida em `css/style.css`, no `:root`)

| Variável | Cor | Uso |
|---|---|---|
| `--cyan` | `#2BE2E8` | Ciano principal — botões, títulos de destaque |
| `--cyan-dark` | `#16B8C2` | Gradientes e hover |
| `--cyan-light` | `#8FF2F4` | Ciano claro |
| `--ink` | `#080F18` | Fundo escuro principal |
| `--ink-2` / `--ink-3` / `--ink-4` | tons de azul-marinho escuro | Camadas de fundo e cards |
| `--white` / `--text-on-dark` | `#FFFFFF` / `#EAF4F5` | Textos |

## Testado

- Responsivo de 360px a 1440px+
- Menu hamburger no mobile com fechamento automático ao clicar em um link
- Header com sombra ao rolar
- Animações de entrada discretas via `IntersectionObserver`
- Validação de formulário (nome, e-mail, telefone, mensagem — campo "Empresa" é opcional) com mensagens de erro/sucesso
- Botão flutuante do WhatsApp
- Sem scroll horizontal em nenhum breakpoint
