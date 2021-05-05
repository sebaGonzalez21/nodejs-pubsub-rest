FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN pnpm install
# If you are building your code for production
# RUN pnpm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD pnpm start
