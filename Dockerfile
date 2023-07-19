# pull official base image
FROM node:18.12.0-alpine

# set working directory
WORKDIR /app

COPY . .

RUN npm install --silent

# start app
CMD ["npm", "start"]
