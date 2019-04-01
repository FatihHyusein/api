FROM keymetrics/pm2:10-jessie

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY pm2.json ./
RUN node -v

RUN npm install
# If you are building your code for production
# RUN npm install --only=production
# Bundle app source
COPY . .

CMD ["pm2-runtime", "start", "pm2.json", "${dbhost},${dbport},${database},${dbuser},${dbpassword},${serverport},${radar_socket_address},${intersectionSettingsConfig},${intersectionSettingsConstants},${login_key},${isPlaygroundMode}"]
