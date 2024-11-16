
# Use official Node.js image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
RUN npm i stripe

COPY . .

RUN npm install @prisma/client
RUN npx prisma generate

RUN npm run build

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
