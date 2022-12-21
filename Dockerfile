FROM node:19-alpine
WORKDIR /app
ENV PATH="./node_modules/.bin:$PATH"
ARG baseUrl="http://localhost:3000"
ENV VITE_APP_API_BASEURL $baseUrl
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
# Get the previously build files
COPY --from=0 /app/build .
EXPOSE 80
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]