# RD Station — Frontend

Aplicação React para recomendação de produtos RD Station com base nas preferências e funcionalidades escolhidas pelo usuário.

---

## Como rodar

```bash
# Na raiz do frontend
cd monorepo/frontend

npm install
npm start
```

A aplicação ficará disponível em `http://localhost:3000`.

> O frontend consome a API do backend em `http://localhost:3001`. Para rodar o projeto completo, use `yarn dev` na raiz do monorepo.

---

## Design

### Cores e tema

As cores foram escolhidas com base na paleta de identidade visual do site da RD Station. O tom turquesa `#19c1ce` foi usado como cor de destaque (_accent_), refletindo diretamente a cor primária da marca.

O sistema de cores é definido via variáveis CSS em [src/index.css](src/index.css) e estendido no Tailwind em [tailwind.config.js](tailwind.config.js), o que permite suporte nativo ao **modo escuro** sem duplicação de estilos. O dark mode é ativado via classe `.dark` no `<html>`, com preferência salva em `localStorage`.

### Formulário em etapas

O formulário foi dividido em 3 etapas sequenciais — **Preferências → Funcionalidades → Tipo de recomendação** — em vez de exibir todos os campos de uma vez.

Essa escolha reduz a carga cognitiva do usuário: cada etapa apresenta um conjunto coeso de opções relacionadas, tornando a tarefa mais compreensível e menos intimidante. O indicador de progresso (StepIndicator) reforça o senso de avanço e conclusão.

### Checkboxes como cards selecionáveis

Ao invés de checkboxes nativos do HTML, as opções de preferências e funcionalidades são renderizadas como **cards clicáveis** ([SelectableCard](src/components/shared/SelectableCard.js)).

Isso aumenta significativamente a área de toque/clique de cada opção, melhorando a usabilidade em dispositivos móveis e reduzindo erros de seleção. Visualmente, o card selecionado recebe destaque de borda e fundo na cor _accent_, comunicando o estado com clareza sem depender apenas da cor.

As opções de tipo de recomendação (`SingleProduct` / `MultipleProducts`) usam a variante detalhada do mesmo componente, com ícone e descrição, por exigirem mais contexto para o usuário tomar uma decisão informada.

---

## Decisões técnicas

### `Set` para lookup no serviço de recomendações

No [recommendation.service.js](src/services/recommendation.service.js), as preferências e funcionalidades selecionadas são convertidas para `Set` antes de qualquer comparação:

```js
const selectedPreferences = new Set(formData.selectedPreferences);
const selectedFeatures = new Set(formData.selectedFeatures);
```

A busca com `Set.has()` é **O(1)**, enquanto `Array.includes()` é **O(n)**. Como as comparações acontecem dentro de `filter` e `map` que já iteram sobre os produtos, evitar um segundo loop linear por elemento mantém a complexidade geral controlada.

### `filter` + `map` em vez de `reduce`

O cálculo de score poderia ser feito em um único `reduce`, mas foi mantido em dois passos separados:

1. `filter` — descarta produtos sem nenhuma correspondência
2. `map` — calcula o score dos produtos restantes

Essa separação favorece a **leitura e manutenção do código**: cada etapa tem uma responsabilidade clara. O `reduce` é uma fonte comum de confusão para desenvolvedores menos experientes, especialmente quando o acumulador muda de forma ao longo da iteração.

### Ordenação por score e depois por ID decrescente

```js
productsMatch.sort((a, b) => b.score - a.score || b.id - a.id);
```

O critério primário é o **score** (mais correspondências = mais relevante). O critério de desempate é o **ID decrescente**, priorizando produtos mais recentes quando dois produtos têm a mesma pontuação. Isso garante um resultado determinístico com um critério de negócio implícito: em caso de empate, o produto mais novo tem preferência.

### Separação em camada de serviço

A lógica de recomendação fica isolada em [recommendation.service.js](src/services/recommendation.service.js), uma função pura sem dependência de React. Isso permite:

- Testar o algoritmo diretamente, sem precisar renderizar componentes ([recommendation.service.test.js](src/services/recommendation.service.test.js))
- Reutilizar ou migrar a lógica independentemente da UI

### Hook `useRecommendations` como adaptador

O hook [useRecommendations.js](src/hooks/useRecommendations.js) funciona como uma ponte entre o estado do formulário e o serviço puro. Esse padrão mantém os componentes desacoplados da lógica de negócio e facilita substituir ou expandir o serviço sem alterar os componentes que o consomem.

---

## Testes

```bash
npm test
```

O desafio original incluía 4 casos de teste para o serviço de recomendações. A cobertura foi expandida para 11 testes em [recommendation.service.test.js](src/services/recommendation.service.test.js).

O foco foi testar a lógica de negócio central — o algoritmo de recomendação — já que ela é uma função pura e, portanto, fácil de testar de forma isolada e determinística.

Os casos cobertos incluem:

- Retorno vazio quando não há seleções ou quando nenhum produto tem correspondência
- Correspondência por preferência, por funcionalidade, e pela combinação de ambas
- Comportamento padrão quando `selectedRecommendationType` não é informado
- Retorno correto para `SingleProduct` e `MultipleProducts`
- Lógica de desempate por ID quando dois produtos têm o mesmo score
- Cálculo correto do score somando preferências e funcionalidades correspondentes
