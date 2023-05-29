# 🇧🇷🇵🇹 Boas vindas ao repositório do projeto TrybeWallet
Este projeto desenvolvido individualmente é uma carteira conversora de despesas, na qual converte de Real para diversas outras moedas.

O objetivo deste projeto foi de consolidar os conhecimentos adquiridos em Redux como ferramenta de gerenciamento de estado.
# Sobre o desenvolvimento
Foi desenvolvido uma página de login simples com validação dos campos de email e senha para formatos válidos habilitando assim o botão para entrar na aplicação e enviando a informação do login para o estado global.

Na página de carteira temos um formulário para preenchimento das informações de despesa, o campo Moeda Câmbio renderiza as opções de moedas disponiveis através de requisição para a API https://economia.awesomeapi.com.br/json/all responsável pelas cotações das moedas, para tratar a assincronicidade foi utilizada a biblioteca Redux Thunk.

Após preenchimento é renderizada uma tabela com as despesas e em cada uma também é possivel editar ou excluir a respectiva despesa.

# 🇺🇸🇬🇧 Welcome to the project TrybeWallet repository
This individually developed project is an expense converter wallet that converts from Brazilian Real (BRL) to various other currencies.

The objective of this project was to consolidate the knowledge acquired in Redux as a state management tool.
# About the development
A simple login page was developed with validation for email and password fields to ensure valid formats, enabling the login button and sending the login information to the global state.

On the wallet page, there is a form for entering expense information. The "Currency Exchange" field renders the available currency options through a request to the API https://economia.awesomeapi.com.br/json/all, which provides currency exchange rates. To handle asynchronous operations, the Redux Thunk library was used.

After filling out the form, a table is rendered with the expenses, and each expense can be edited or deleted.
<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
