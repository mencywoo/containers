FROM node:7
RUN apt-get update
#RUN apt-get install nodejs -y

RUN mkdir -p /opt/webapp
WORKDIR /opt/webapp


COPY ./webapp/package.json /opt/webapp/



RUN npm install

COPY ./webapp/bin/  /opt/webapp/bin/
COPY ./webapp/public/javascripts  /opt/webapp/public/javascripts
COPY ./webapp/public/stylesheets  /opt/webapp/public/stylesheets
COPY ./webapp/routes/  /opt/webapp/routes/
COPY ./webapp/static/  /opt/webapp/static/
COPY ./webapp/views/  /opt/webapp/views/
COPY ./webapp/app.js /opt/webapp/
EXPOSE 8080

CMD [ "npm", "start" ]
