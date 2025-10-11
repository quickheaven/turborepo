# Product Management System

A monorepo built with Turborepo that includes a Next.js frontend and NestJS backend for managing products.

## Project Structure

- `apps/web`: Next.js frontend application
- `apps/turborepo-nestjs`: NestJS backend application
- `packages/types`: Shared TypeScript interfaces and types
- `packages/eslint-config`: Shared ESLint configurations
- `packages/typescript-config`: Shared TypeScript configurations

## Features

- Create and list products
- Shared types between frontend and backend
- Server-side rendering with Next.js
- RESTful API with NestJS
- Type-safe development with TypeScript

## Getting Started

1. Install dependencies:
```sh
pnpm install
```

2. Start development servers:
```sh
pnpm dev
```

This will start:
- Frontend at `http://localhost:3000`
- Backend at `http://localhost:3001`

## Building for Production

```sh
pnpm build
```

## Docker Support

Build and run the applications using Docker:

```sh
# Build and run NestJS backend
docker build -t turborepo-nestjs -f apps/turborepo-nestjs/Dockerfile .
docker run turborepo-nestjs

# Build and run Next.js frontend
docker build -t web -f apps/web/Dockerfile .
docker run web
```

## Tech Stack

- Frontend: Next.js
- Backend: NestJS
- Package Manager: pnpm
- Build System: Turborepo
- Language: TypeScript
- Containerization: Docker

## Development Tools

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

For more detailed documentation, refer to individual package README files.
