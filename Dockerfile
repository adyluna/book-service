# Use uma imagem oficial do Node.js como base
FROM node:14

# Defina a pasta de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para a pasta de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código para a pasta de trabalho
COPY . .

# Expõe a porta que sua aplicação usa
EXPOSE 8000

# Comando para iniciar sua aplicação
CMD [ "npm", "run", "start" ]
