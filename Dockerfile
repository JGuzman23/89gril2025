# Etapa de construcción
FROM node:20-alpine AS builder

# Crea el directorio de trabajo
WORKDIR /app

# Copia dependencias primero (para cacheo)
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Ejecuta el build
RUN npm run build

# -----------------------------

# Etapa de producción / runtime
FROM node:20-alpine AS runtime

# Crea el directorio de trabajo
WORKDIR /app

# Copia solo lo necesario del builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Copia tu archivo .env si lo necesitas
COPY .env .env

# Expone el puerto en el que correrá el servidor Astro
EXPOSE 80

# Comando de inicio (usa el servidor generado por Astro + @astrojs/node)
CMD ["node", "./dist/server/entry.mjs"]
