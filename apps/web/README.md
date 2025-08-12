# Learn Turborepo By Example | Code Sharing, Cache and More


## Table of Contents

- [Introduction](#learn-turborepo-by-example--code-sharing-cache-and-more)
- [Create nest js app](#create-nest-js-app)
- [Setup the products module in NestJS](#setup-the-products-module-in-nestjs)
- [Create a reusable component](#create-a-reusable-component)
- [Remote Caching](#remote-caching)
- [Install turbo globally](#install-the-turbo-package-globally-using-npm)
- [Dockerfile - NestJS](#dockerfile---nestjs)
- [Dockerfile - NextJS](#dockerfile---nextjs)



```
pnpm dlx create-turbo@latest
```

To refer to common:
```
import { Button } from "@repo/ui/button";
```

## Create nest js app
Add the common eslint and typescript in package.json of NestJS
(turborepo-nestjs/package.json)
```
  "devDependencies": {
    "@repo/types": "workspace:*",
    "@repo/typescript-config": "workspace:*",    
  }
```	

Run npm install.
```
npm install
```

Extend the typescript based.json from packages.
```
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",    
    "next-env.d.ts",
    "next.config.js",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### Setup the products module in NestJS	
(Delete default nestjs app controller, services and ts.)

```
nest g module products
```

```
nest g controller products
```

```
nest g service products
```

## Create a reusable component
### Create the types folder in packages
```
/turborepo/packages/types
```

### Create package.json inside types folder.

```
{
    "name": "@repo/types",
    "version": "0.0.0",
    "private": true,
    "scripts": {
        "build": "tsc",
        "dev": "tsc --watch",
        "lint": "eslint . --max-warnings 0"
    },
    "exports": {
        ".": {
            "types": "./src/index.ts",
            "default": "./src/index.js"
        }
    },
    "devDependencies": {
        "@repo/eslint-config": "workspace:*",
        "@repo/typescript-config": "workspace:*",
        "@types/node": "^22.15.3",
        "@types/eslint": "^8.38.0",
        "eslint": "^9.31.0",
        "typescript": "5.8.2"
    }
}
```

### Create tsconfig.json

```
{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
      "outDir": "./dist",
      "strict": false,
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}
```

### Create eslint.json

```
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
```

```
pnpm run build --filter=@repo/types
```

```
pnpm run build
```

### Create dto request file
```
/packages/types/src/products/dto/create-product.request.ts
```

```
export class CreateProductRequest {
    name: string;
    price: number;
}
```

### Add dependency in turborepo-nestjs


## Remote Caching
Login to vercel and generate entries for TURBO_TEAM and TURBO_TOKEN
```
pnpm dlx turbo login
pnpm dlx turbo link
```

### Install the ```turbo``` package globally using npm.

```
npm i g turbo
```
#### Create a minimal set of files and dependencies needed to build and run the turborepo-nestjs app in a Docker environment. 

```
turbo prune turborepo-nestjs --docker
```

### Dockerfile - NestJS
```
FROM node:lts-alpine AS pruner

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=turborepo-nestjs --docker

FROM node:lts-alpine AS installer

WORKDIR /app
COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/turbo.json ./turbo.json
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

FROM node:lts-alpine AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .
RUN npm install -g pnpm
RUN pnpm run build

FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/ .

CMD ["node", "apps/turborepo-nestjs/dist/main"]
```

```
docker build -t turborepo-nestjs -f apps/turborepo-nestjs/Dockerfile .
docker run turborepo-nestjs
docker run --rm -it --entrypoint sh turborepo-nestjs
```

### Dockerfile - NextJS
```
FROM node:lts-alpine AS pruner

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=web --docker

FROM node:lts-alpine AS installer

WORKDIR /app
COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/turbo.json ./turbo.json
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

FROM node:lts-alpine AS builder
ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM
ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .
RUN npm install -g pnpm
RUN pnpm run build

FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g pnpm
COPY --from=builder /app/ .
WORKDIR /app/apps/web

CMD ["pnpm", "start"]
```

```
docker build -t web -f apps/web/Dockerfile .
docker run web
docker run --rm -it --entrypoint sh web
docker build -t web -f apps/web/Dockerfile . --no-cache --build-arg 
```
