FROM node:18

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app/
COPY app.js /app/
COPY index.html /app/
 
# Create app directory
WORKDIR /app


RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

CMD [ "node", "app.js" ]