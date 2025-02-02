# Layout Generator CLI

Uma ferramenta CLI para Angular que gera layouts padrão e services CRUD de forma rápida e eficiente.

## Funcionalidades

- Geração de layout com sidebar, toolbar e content area usando Angular Material
- Geração de services com métodos CRUD HTTP
- Estrutura de arquivos organizada
- Templates modernos e responsivos

## Pré-requisitos

Antes de instalar o CLI, certifique-se de ter:

1. Um projeto Angular (versão 18 ou superior)
2. Angular Material instalado no projeto:
```bash
ng add @angular/material
```

## Instalação

Instale o CLI globalmente usando npm:

```bash
npm i -g lg-angular-cli
```

## Comandos Disponíveis

### Gerar Layout

```bash
lg-cli layout
```

Este comando gera:
- Uma toolbar responsiva com menu toggle e botão de logout
- Uma sidebar com logo e menu de navegação
- Uma área de conteúdo principal
- Estilos SCSS pré-configurados

O layout gerado inclui:
- Suporte a responsividade
- Integração com Angular Material
- Menu de navegação funcional
- Sistema de rotas preparado

### Gerar Service

```bash
lg-cli service NomeDoService --http
```

Este comando gera um service com:
- Estrutura CRUD completa
- Métodos HTTP pré-configurados:
  - `getAll()`
  - `getById(id)`
  - `create(data)`
  - `update(id, data)`
  - `delete(id)`
- Injeção de dependências configurada
- Tipagem TypeScript

## Estrutura dos Arquivos Gerados

### Layout
```
src/app/
├── app.component.html
├── app.component.scss
└── app.component.ts
```

### Service
```
src/app/services/
└── nome-do-service/
    └── nome-do-service.service.ts
```

## Dependências Necessárias

Certifique-se de ter as seguintes dependências no seu `package.json`:

```json
{
  "dependencies": {
    "@angular/material": "^x.x.x",
    "@angular/cdk": "^x.x.x"
  }
}
```

## Personalização

### Layout
- A logo pode ser alterada no arquivo `app.component.html`
- As cores podem ser modificadas no arquivo `app.component.scss`
- O menu pode ser configurado no arquivo `app.component.ts`

### Service
- A URL base da API pode ser configurada em `API_URL`
- Os tipos de dados podem ser personalizados conforme necessário
- Métodos adicionais podem ser incluídos conforme a necessidade

## Solução de Problemas

1. Certifique-se de que o Angular Material está instalado
2. Verifique se todas as importações estão corretas
3. Execute `npm install` após gerar novos componentes
4. Certifique-se de que o módulo HTTP está importado no seu `app.module.ts`

## Contribuição

Sinta-se à vontade para contribuir com o projeto:

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## Autor

Henrique Garcia - [GitHub](https://github.com/hnrquera)

## Suporte

Para suporte, envie um email para [henriquegarcia0401@gmail.com]