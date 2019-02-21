FROM node:8

# Create app directory
WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN chmod -Rf 777 ./files

EXPOSE 4000
CMD [ "npm", "start" ]