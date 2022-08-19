FROM node:16 as builder
LABEL maintainer="Sam Bulatov<mephistorine@gmail.com>"

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY next.config.js tsconfig.json tailwind.config.js postcss.config.js ./
COPY . ./

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
