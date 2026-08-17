FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY public ./public
COPY src ./src

EXPOSE 3000

CMD ["npm", "start"]