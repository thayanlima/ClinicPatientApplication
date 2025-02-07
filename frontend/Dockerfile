# Etapa 1: Construir a aplicação
FROM node:18 AS build

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar os arquivos de dependências
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY ./frontend/ ./

# Build da aplicação
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine

# Copiar a configuração personalizada do Nginx
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos construídos para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80 para servir a aplicação
EXPOSE 80

# Comando para iniciar o Nginx (isso vai servir os arquivos estáticos)
CMD ["nginx", "-g", "daemon off;"]