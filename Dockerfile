FROM node as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ENV REACT_APP_BACKEND_HOST=http://54.205.248.152:8080
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest
COPY --from=build /app/build/ /usr/share/nginx/html
Run rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/
Run cat /etc/nginx/conf.d/default.conf