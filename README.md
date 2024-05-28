# Hotel Reservation NTConsult

## Descrição

Este é um sistema de reserva de hotéis desenvolvido com Vue.js e Vuetify. A aplicação permite que os usuários pesquisem hotéis, comparem opções e façam reservas. O projeto utiliza Pinia para gerenciamento de estado e Vitest para testes.

## Funcionalidades

- **Pesquisa de Hotéis:** Permite ao usuário inserir critérios de pesquisa como destino, datas de check-in e check-out, número de quartos e número de hóspedes.
- **Comparação de Opções:** Permite que o usuário selecione múltiplos hotéis dos resultados de busca para comparar suas características lado a lado.
- **Reserva de Quartos:** Implementa um formulário para reservar um quarto em um hotel selecionado, solicitando informações como nome do usuário, contato e detalhes de pagamento.

## Tecnologias Utilizadas

- Vue.js 3
- Vuetify 3
- Pinia
- Vitest
- TypeScript
- Axios

## Pré-requisitos

- Node.js (versão 18 ou superior)
- Yarn (ou npm, se preferir)

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/bcmartinelli/hotel-reservation-ntconsult.git
   cd hotel-reservation-system
   ```

2. Instale as dependências:
   ```sh
   yarn install
   ```

## Executando a Aplicação

Para iniciar o servidor de desenvolvimento, execute:

```sh
yarn dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Estrutura do Projeto

```plaintext
├── src
│   ├── assets
│   ├── components
│   │   ├── forms
│   │   │   └── BookingForm.vue
│   │   │   └── SearchForm.vue
│   │   ├── CardHotel.vue
│   │   ├── Header.vue
│   │   ├── Notification.vue
│   │   └── SearchResults.vue
│   ├── plugins
│   │   └── index.ts
│   ├── router
│   │   └── index.ts
│   ├── services
│   │   └── notificationService.ts
│   ├── store
│   │   ├── booking.ts
│   │   ├── comparison.ts
│   │   └── search.ts
│   ├── styles
│   │   ├── global.scss
│   │   └── variables.scss
│   ├── utils
│   │   ├── index.ts
│   │   └── mockApi.js
│   ├── views
│   │   ├── HomeView.vue
│   │   └── ComparisonView.vue
│   ├── App.vue
│   ├── main.ts
│   └── types.ts
├── tests
├── tsconfig.json
├── yarn.lock
└── package.json
```

## Executando Testes

Para rodar os testes, execute:

```sh
yarn test
```

Para visualizar a cobertura de testes, execute:

```sh
yarn coverage
```
