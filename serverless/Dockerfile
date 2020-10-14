# Stage 1 - the build process
FROM node:14-alpine as compile-server
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8100
CMD [ "npm", "start" ]