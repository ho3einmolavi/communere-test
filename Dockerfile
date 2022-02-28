FROM node:16.14.0-alpine3.14

RUN apk update
RUN apk upgrade

ENV API_ROOT /app

WORKDIR ${API_ROOT}

COPY ./*.json ./
#COPY ./package-lock.json ./

RUN npm install
RUN npm install pm2 -g

COPY ./src ./src
# COPY ./prod.env ./.env

RUN npm run build

# EXPOSE 8080

CMD ["pm2-runtime", "dist/main.js"]