FROM node:12.22.12

# Create app directory
WORKDIR /usr/src/app

COPY . .
RUN npm install

VOLUME ./files

EXPOSE 4000
CMD [ "npm", "start" ]
