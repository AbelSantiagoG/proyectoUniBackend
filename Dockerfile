# Usa la imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que corre NestJS
EXPOSE 3000

# Construir el proyecto antes de ejecutarlo
RUN npm run build

# Comando para ejecutar la app compilada
CMD ["node", "dist/main"]

