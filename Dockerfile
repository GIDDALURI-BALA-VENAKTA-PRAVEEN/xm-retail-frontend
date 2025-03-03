FROM node:22-alpine as build

# Declare build time environment variables
ARG REACT_APP_SERVER_BASE_URL
ENV REACT_APP_SERVER_BASE_URL=$REACT_APP_SERVER_BASE_URL

#Build App
#set Working Directory
WORKDIR /app

# Copy all package.json file and dependencies to ./
COPY package.json .
#Install all app files 
RUN npm install

COPY . .
# Create Build file
RUN npm run Build


#server with Nigina
FROM nginx:1.23-alpine

# create html file in /usr/share/nginx
WORKDIR /usr/share/nginx/html

#Now we are in html file and remove files if already exsists
RUN rm -rf *

#We have build file in /app/build copy taht file to html file
COPY --from=build /app/build .

#Nginx always use port 80
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]