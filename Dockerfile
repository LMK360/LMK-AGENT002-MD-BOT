Use official Node.js LTS image
FROM node:18-alpine

Set working directory inside container
WORKDIR /usr/src/app

Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

Copy rest of the app code
COPY . .

Expose port (if your app uses one, e.g. 9090)
EXPOSE 9090

Start the app
CMD ["node", "index.js"]
