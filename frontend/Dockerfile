# Build stage
FROM node:20 AS build

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY . .

# Build React application
RUN npm run build


# Production stage
FROM node:20

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy the built React application
COPY --from=build /app/dist ./dist

# Frontend port
EXPOSE 5173

# Serve the production build
CMD ["serve", "-s", "dist", "-l", "5173"]