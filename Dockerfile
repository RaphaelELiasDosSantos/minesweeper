FROM node:10.16.3-jessie
WORKDIR /usr/src/app
COPY . .
# RUN rm -R node_modules
# RUN rm package-lock.json
RUN npm install
EXPOSE 80
CMD [ "npm", "run", "start:dist" ]
