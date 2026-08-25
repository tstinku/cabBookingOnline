# Uber Clone Backend

Quick setup and API docs

## Install

Install dependencies:

```bash
npm install
```

## Run (development)

Start the server:

```bash
npm run dev
```

The server defaults to port 3000 (change in `src/server.js` or your env).

## API Documentation

Open the Swagger UI after the server is running:

http://localhost:3000/api-docs

This documents the main endpoints (auth, drivers, vehicles, driver-documents, admin).

## Generate Architecture PPT

You can generate a quick PowerPoint summarizing the high-level architecture:

1. Install generator dependency:

```bash
npm install pptxgenjs
```

2. Run the script:

```bash
node scripts/generate_ppt.js
```

The script will write `docs/Architecture.pptx`.
