FROM node:19-alpine
 
WORKDIR /user/src/app
COPY . .
RUN npm install
 
RUN npx mikro-orm database:create
RUN npx mikro-orm schema:create -r

RUN npm run build
USER node

CMD ["npm", "run", "start:prod"]
