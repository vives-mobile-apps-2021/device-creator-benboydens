FROM node:14-alpine3.12

WORKDIR /backend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]