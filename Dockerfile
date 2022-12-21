FROM node:19-alpine
WORKDIR /app
ENV PATH="./node_modules/.bin:$PATH"
#ENV VITE_APP_API_BASEURL="https://api.argentbank.iloa.dev"
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Get the previously build files
COPY --from=0 /app/build .
EXPOSE 80
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]