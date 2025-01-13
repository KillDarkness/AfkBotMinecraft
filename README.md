# MystickMC - BOT AFK

MystickMC é um bot desenvolvido para automatizar tarefas em servidores Minecraft usando a biblioteca [mineflayer](https://github.com/PrismarineJS/mineflayer). Este projeto inclui uma interface web para monitorar e interagir com o bot em tempo real.

## Descrição

Este projeto é um bot AFK para Minecraft, capaz de se conectar a servidores, realizar tarefas simples e fornecer informações do jogo em uma interface web. Ele também permite o envio de comandos e interações via chat. Mas o principal objetivo é para o Aternos para deixar o server 24/7

## Requisitos

- Node.js v14 ou superior
- Servidor Minecraft compatível com a versão configurada

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/KillDarkness/AfkBotMinecraft.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd AfkBotMinecraft
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Certifique-se de que a porta 1010 esteja disponível em seu sistema.

## Configuração

1. Edite o arquivo `config.json` para adicionar as informações do servidor Minecraft:
   ```json
   {
     "host": "<endereço_do_servidor>",
     "port": <porta>,
     "version": "<versão_do_minecraft>",
     "username": "<nome_de_usuário>",
     "password": null
   }
   ```
   - Substitua `<endereço_do_servidor>`, `<porta>`, `<versão_do_minecraft>` e `<nome_de_usuário>` pelas informações adequadas.

## Uso

1. Inicie o servidor:

   ```bash
   node index.js
   ```

2. Acesse a interface web em: [http://localhost:1010](http://localhost:1010)

3. Monitore as informações do bot e envie comandos diretamente pelo chat da interface.

## Funcionalidades

- Conexão automática ao servidor Minecraft
- Monitoramento em tempo real de:
  - Coordenadas do bot
  - Vida e fome
  - Horário do jogo
- Chat interativo (mensagens globais e privadas)
- Reconexão automática em caso de desconexão

## Estrutura do Projeto

```plaintext
AfkBotMinecraft/
├── public/
│   ├── index.html         # Interface web
│   ├── style.css          # Estilo da interface web
│   ├── mystick.png        # Ícone do projeto   
├── index.js               # Código principal do bot e servidor
├── config.json            # Configuração do bot
├── package.json           # Dependências do projeto
└── README.md              # Documentação
```

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Fork o repositório
2. Crie um branch para sua funcionalidade:
   ```bash
   git checkout -b minha-funcionalidade
   ```
3. Faça commit de suas alterações:
   ```bash
   git commit -m "Adicionei uma nova funcionalidade"
   ```
4. Faça push para o branch:
   ```bash
   git push origin minha-funcionalidade
   ```
5. Abra um Pull Request

## Licença

Este projeto foi desenvolvido por **KillDarkness**. Sinta-se à vontade para usá-lo, modificá-lo e compartilhá-lo.

[Repositório no GitHub](https://github.com/KillDarkness/AfkBotMinecraft)

