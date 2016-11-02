FROM node:7
RUN apt-get update
#RUN apt-get install nodejs -y

RUN mkdir -p /opt/webapp
WORKDIR /opt/webapp
COPY package.json /opt/webapp/
RUN npm install

COPY ./index.js /opt/webapp/
EXPOSE 8080

CMD [ "node", "index.js" ]
