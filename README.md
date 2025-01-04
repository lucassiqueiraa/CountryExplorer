# Projeto: Portal de Merchandising Regional

## 1. Introdução
O objetivo deste projeto é consolidar os conhecimentos adquiridos na unidade curricular de **Programação para a Web - Cliente (PW-C)**, utilizando as linguagens HTML, CSS e JavaScript para o desenvolvimento de um portal online. Este portal tem como propósito principal permitir aos usuários conhecerem países ao redor do mundo, explorar seus produtos de merchandising regional e realizar compras online.

O projeto também cumpre os requisitos funcionais estabelecidos na unidade curricular de **Introdução à Análise e Projeto de Sistemas de Informação (IAPSI)**, com a integração da API **REST Countries** para fornecer dados sobre os países.

## Grupo 
- Lucas Emanuel Santos Siqueira - 2231435
- Altamir Rodrigues - 2232360

## Link repositório
- https://github.com/lucassiqueiraa/CountryExplorer

## 2. Cenário
O portal tem como objetivo proporcionar uma plataforma para que os utilizadores possam:
- Conhecer os países existentes no mundo.
- Selecionar países como favoritos.
- Visualizar detalhes sobre cada país.
- Filtrar países por moeda.
- Comprar produtos de merchandising regional de cada país.
- Entrar em contacto com a equipa de desenvolvimento.

## 3. Desenvolvimento

### 3.1 Especificações
O desenvolvimento do projeto seguiu as seguintes especificações:
- **Layout**: Foi implementado conforme o design fornecido, com o uso de HTML, CSS e JavaScript. A **Framework Bootstrap** foi utilizada para a definição do layout responsivo.
- **JavaScript**: Todo o código JavaScript foi colocado em ficheiros externos e organizados de acordo com as páginas.
- **CSS**: Os estilos foram implementados em arquivos CSS externos.
- **Design Responsivo**: O projeto foi desenvolvido para garantir que o site tenha uma boa apresentação em dispositivos móveis.
- **Proibição de Templates HTML**: Não foi permitido o uso de templates HTML no desenvolvimento do projeto.
- **Indentação**: Todo o código foi devidamente indentado para facilitar a leitura e manutenção.

### 3.2 API – REST Countries
A API **REST Countries** foi utilizada para fornecer informações detalhadas sobre os países do mundo. A documentação da API está disponível em [REST Countries API Documentation](https://restcountries.com/).

Esta API oferece dados em formato JSON sobre os países, incluindo informações como:
- Nome do país
- População
- Capital
- Idiomas
- Moeda
- Localização geográfica

### 3.3 Estrutura de Páginas
O projeto é composto pelas seguintes páginas:

- **Homepage**: A página principal, com uma lista de 3 países aleatórios em destaque.
- **Países**: Página que apresenta uma lista de países em formato de cards, com um filtro de pesquisa por nome.
- **Detalhes do País**: Página que exibe informações detalhadas sobre um país, apresentadas em formato de tabela.
- **Favoritos**: Página que exibe os países selecionados pelo usuário como favoritos.
- **Contactos**: Página com a descrição da equipa de desenvolvimento, um formulário de contacto e links para redes sociais (fictícias).

### 3.4 Web Storage
Foi utilizado **Web Storage** para persistir os dados relacionados aos favoritos, garantindo que as preferências dos usuários sejam mantidas mesmo após o fechamento do navegador.

## 4. Funcionalidades Implementadas
- **Exploração de Países**: O usuário pode explorar diferentes países, ver detalhes e adicionar países aos favoritos.
- **Filtro de Pesquisa**: A página de países permite que o usuário busque por países com base no nome.
- **Sistema de Favoritos**: O usuário pode adicionar ou remover países dos favoritos, que são salvos localmente utilizando Web Storage.
- **Página de Detalhes**: Cada país tem uma página dedicada com informações completas sobre o país, incluindo dados como moeda, população, idioma e mais.
- **Responsividade**: O site foi desenvolvido para ser completamente funcional em dispositivos móveis.

## 5. Tecnologias Utilizadas
- **HTML**: Para estruturação das páginas.
- **CSS**: Para o estilo e layout do site.
- **JavaScript**: Para funcionalidades interativas, como a manipulação da API e persistência dos favoritos.
- **Bootstrap**: Para o desenvolvimento de um layout responsivo e visualmente agradável.
- **API REST Countries**: Para fornecer dados sobre os países do mundo.
- **Web Storage**: Para salvar os países favoritos localmente.

## 6. Como Executar o Projeto

### 6.1 Pré-requisitos
Para rodar este projeto, é necessário ter um navegador moderno instalado, como o Google Chrome ou o Firefox.

### 6.2 Passos para execução
1. Clone este repositório:
   ```bash
   git clone https://github.com/lucassiqueiraa/CountryExplorer.git