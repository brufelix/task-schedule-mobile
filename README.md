# task-schedule
Agenda de tarefas, foi implementado um back-end para realizar o cadastro de usuário e armazenar as tarefas em um banco de dados.
<p>
<img src="https://github.com/brufelix/task-schedule/blob/master/images/WhatsApp%20Image%202020-03-09%20at%2011.09.00(1).jpeg" width=200/>
<img src="https://github.com/brufelix/task-schedule/blob/master/images/WhatsApp%20Image%202020-03-09%20at%2011.09.00.jpeg" width=200/>
<img src="https://github.com/brufelix/task-schedule/blob/master/images/WhatsApp%20Image%202020-03-09%20at%2011.09.00(4).jpeg" width=200/>
<img src="https://github.com/brufelix/task-schedule/blob/master/images/WhatsApp%20Image%202020-03-09%20at%2011.09.00(2).jpeg" width=200/>
<img src="https://github.com/brufelix/task-schedule/blob/master/images/WhatsApp%20Image%202020-03-09%20at%2011.09.00(3).jpeg" width=200/>
<p>

> Aplicação móvel para Agendar tarefas.

- **Tecnologias Utilizadas**
  - **_React_**
  - **_React Native_**
  - **_Node_**
  - **_Expo_**
- **Motivação**
  - Feito para a pratica da linguagem javascript e da biblioteca react.js .
- **Exercutar aplicação móvel**
  
 - **Exercutar Servidor**
      > Comando para instalar Postgres, caso não instalado. 
      - `sudo apt install postgresql` 
      - `sudo apt install postgresql-contrib`  
      > Acessando o banco. 
      
      - psql -U *nameUser* -h *host*
      
      - Criação do database
        > Utilizando via terminal linux.
          - `CREATE DATABASE tasks;`
        > Depois desses passos acima vá no arquivo tasks-backend/knexfile.js e modifique os dados para permiter o acesso ao banco.
        
        > Exercute o comando dentro da pasta do projeto tasks-backend depois de inserir os dados no knexfile.js
         - knex migrate:latest
      - Iniciar Servidor 
        - *Porta alocada para o servidor escutar: 33000*
        - `sudo npm install i`
        - `npm start`
        
 > Utilizando o Expo.
  
  > Comandos dentro do diretório do projeto.  
  - Certifique-se que atribuiu o enderenço IP do servidor no arquivo *task-schedule/tasks/src/common.js*.
  - `$ sudo npm install -g expo-cli`
  - `$ sudo npm i`
  - `$ sudo npm start`
