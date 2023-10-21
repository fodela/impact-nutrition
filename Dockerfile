
FROM node:18-alpine as build

# Install dependencies for image processing
RUN apk update
# RUN apk --no-cache --virtual build-dependencies add \
#   jpeg-dev \
#   cairo-dev \
#   giflib-dev \
#   pango-dev \
#   python3 \
#   make \
#   g++

# Install the PostgreSQL client library
RUN apk add --no-cache postgresql-client

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to /app
COPY package.json ./

# Install the dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the source code to /app
COPY . .

# Set the database connection string environment variable
ENV DATABASE_URL=postgres://postgres:postgres@db:5432/appdb

# Copy the build output and node_modules from the build image
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules

# Change the ownership of the files to nextjs user
RUN chown -R nextjs:nodejs ./

# Switch to nextjs user
USER nextjs

# Expose port 3000
EXPOSE 3000

# Start the app with npm start
CMD ["npm", "start"]

# Generate the build of the application
RUN npm run dev