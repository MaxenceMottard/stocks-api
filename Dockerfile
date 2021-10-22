FROM node:14.16-alpine

WORKDIR /home/node/

COPY . .

CMD ["npm", "run", "start:prod"]

EXPOSE 80
