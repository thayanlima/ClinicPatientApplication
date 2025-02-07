# Etapa 1: Usar uma imagem base com Node.js
FROM node:18-alpine

# Etapa 2: Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Etapa 3: Copiar o package.json e o package-lock.json para o diretório de trabalho
COPY ./backend/package*.json ./

# Etapa 4: Instalar as dependências
RUN npm install

# Etapa 5: Copiar todos os arquivos do projeto para o container
COPY ./backend/ ./

# Etapa 6: Compilar o código (se necessário)
RUN npm run build

# Etapa 7: Expor a porta onde o backend estará rodando
EXPOSE 3001

# Etapa 8: Definir o comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
