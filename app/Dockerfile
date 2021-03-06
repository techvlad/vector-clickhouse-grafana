### Base
FROM node:14-slim as base

# Enable Node.js optimisation
ENV NODE_ENV=production
# Create application folder
# WORKDIR can`t create folder with given user:group
# So, we will create it ourselves
RUN mkdir /app && chown -R node:node /app

# Set default folder to /app
WORKDIR /app

# Node.js image comes with user node so let`s switch
USER node

# Copy dependencies describing files
COPY --chown=node:node package.json package-lock*.json ./

# Install runtime dependencies
RUN npm ci --prod


### Builder
FROM base as builder

# Install development dependencies (typings, etc.) require for build
RUN npm install --only=development

# Copy application source code
COPY --chown=node:node . ./

# Build application
RUN npm run build


### Runtime
FROM base as runtime

# Copy runtime dependencies
COPY --chown=node:node --from=base /app/node_modules ./node_modules
# Copy compiled application
COPY --chown=node:node --from=builder /app/dist ./dist
# Setup entry point
CMD [ "node", "-r", "source-map-support/register", "dist/main.js" ]
