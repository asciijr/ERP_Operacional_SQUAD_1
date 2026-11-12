# ---------- base ----------
FROM node:24-alpine AS base
WORKDIR /app
# openssl é exigido pelo Prisma no Alpine
RUN apk add --no-cache openssl
COPY package*.json ./
COPY prisma ./prisma

# ---------- dev (hot reload) ----------
FROM base AS dev
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---------- build ----------
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# ---------- produção ----------
FROM node:24-alpine AS prod
WORKDIR /app
RUN apk add --no-cache openssl
ENV NODE_ENV=production
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev --ignore-scripts && npx --yes prisma@5.22.0 generate
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["sh", "-c", "npx --yes prisma@5.22.0 migrate deploy && node dist/main.js"]
