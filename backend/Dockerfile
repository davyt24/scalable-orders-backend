FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo package.json y package-lock.json primero (para aprovechar cache)
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar el código fuente
COPY src ./src

# Variable de entorno por defecto (puedes sobreescribirla en docker-compose)
ENV PORT=3000

EXPOSE 3000

# Comando de arranque
CMD ["npm", "start"]

