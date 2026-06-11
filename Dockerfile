# --- BASE STAGE ---
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# --- DEVELOPMENT STAGE ---
FROM base AS development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# --- DEPENDENCIES STAGE ---
FROM base AS deps
RUN npm ci --omit=dev --ignore-scripts

# -- PRODUCTION STAGE ---
FROM node:20-alpine AS production
WORKDIR /usr/src/app

COPY --from=deps --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

USER node
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

CMD ["node", "src/server.js"]
