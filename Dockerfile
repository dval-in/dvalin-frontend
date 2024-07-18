FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .


ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Build the application
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["pnpm", "run", "preview"]