FROM ubuntu

RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app

COPY ./ ./
RUN apt update -y
RUN apt install nodejs -y
RUN apt install npm -y
RUN npm install -y

EXPOSE 3009
CMD [ "npm", "run", "prod" ]